/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import path, { join } from 'path'
import { readFileSync } from 'fs'
import resolvers from './graphql/resolvers/index.js'
import express from 'express/index.js'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware.js'
import cors from 'cors/lib/index.js'
// import log4js from 'log4js/'
// import { graphqlUploadExpress } from 'graphql-upload-minimal'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import dotenv from 'dotenv'

dotenv.config()

// log4js.configure({
//   appenders: { cwLogs: { type: '@log4js-node/aws-cloudwatch' } },
//   categories: { default: { appenders: ['cwLogs'], level: 'info' } },
// })

// const logger = log4js.getLogger('backend-api')
const schemaPath = join(process.cwd(), 'src/graphql/__generated__/schema.gql')
const typeDefs = readFileSync(schemaPath, 'utf8')
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // logger,
  csrfPrevention: false,
})
const app = express()

server.start().then(async () => {
  app.use(
    cors({
      // origin: 'http://localhost:3000',
    }),
    express.json(),
    awsServerlessExpressMiddleware.eventContext(),
    graphqlUploadExpress({
      maxFileSize: 10000000, // 10 MB
      maxFiles: 10,
    }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        // Bearer を取り除く
        let rawJwt = req.headers.authorization
        rawJwt = rawJwt ? rawJwt.replace('Bearer ', '') : ''

        // console.log('rawJwt: ', rawJwt)
        // decode jwt

        // https://github.com/awslabs/aws-jwt-verify
        const verifier = CognitoJwtVerifier.create({
          userPoolId: process.env.COGNITO_USER_POOL_ID,
          tokenUse: 'id',
          clientId: process.env.COGNITO_CLIENT_ID,
        })

        let decoded = null
        try {
          decoded = await verifier.verify(rawJwt)

          console.log('decoded: ', decoded)
        } catch (err) {
          console.log('error: ', err)
        }

        return { decoded }
      },
    })
  )

  app.listen(3001, function() {
    console.log('App started')
    // logger.trace('App started')
  })
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app
