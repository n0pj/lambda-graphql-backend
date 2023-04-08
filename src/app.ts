/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { join } from 'path'
import { readFileSync } from 'fs'
import { resolvers } from './graphql/resolvers'
import express from 'express'
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware'
import cors from 'cors'
import bodyParser from 'body-parser'
import log4js from 'log4js'
import { Context } from 'types/app'

log4js.configure({
  appenders: { cheese: { type: 'file', filename: 'backend-api.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } },
})

const logger = log4js.getLogger('backend-api')
const path = join(process.cwd(), 'src/graphql/__generated__/schema.gql')
const typeDefs = readFileSync(path, 'utf8')
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
})
const app = express()

server.start().then(() => {
  app.use(
    cors(),
    bodyParser.json(),
    awsServerlessExpressMiddleware.eventContext(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const jwt = req.headers.authorization

        console.log('jwt: ', jwt)

        return { jwt }
      },
    }),
    function (req, res, next) {
      // res.header('Access-Control-Allow-Origin', '*')
      // res.header('Access-Control-Allow-Headers', '*')
      next()
    }
  )
})

// server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests()

// exports.graphqlHandler = serverlessExpress({ app })

app.listen(3001, function () {
  logger.trace('App started')
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
export default app
