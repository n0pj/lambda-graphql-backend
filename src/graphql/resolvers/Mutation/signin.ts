import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'

const prisma = new PrismaClient()

interface SigninArgs {
  email: string
  password: string
}

const signin = async (_: any, { email, password }: SigninArgs) => {
  const AWS_REGION = process.env.AWS_REGION
  const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET
  const CLIENT_ID = process.env.COGNITO_CLIENT_ID
  const client = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })
  const secretHash = generateSecretHash(CLIENT_ID, CLIENT_SECRET, email)

  const signInCommand = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  })

  try {
    const response = await client.send(signInCommand)

    // response:
    // {
    //   '$metadata': {
    //     httpStatusCode: 200,
    //     requestId: '5c5bb8ad-e748-4f2e-a336-794304892b23',
    //     extendedRequestId: undefined,
    //     cfId: undefined,
    //     attempts: 1,
    //     totalRetryDelay: 0
    //   },
    //   AuthenticationResult: {
    //     AccessToken: 'xxx',
    //     ExpiresIn: 3600,
    //     IdToken: 'xxx',
    //     NewDeviceMetadata: undefined,
    //     RefreshToken: 'xxx',
    //     TokenType: 'Bearer'
    //   },
    //   ChallengeName: undefined,
    //   ChallengeParameters: {},
    //   Session: undefined
    // }
    console.log(response)
    console.log('User signed in successfully')
  } catch (error) {
    console.log('Error signing in user:', error)

    throw new Error(error)
  }

  const username = email
  const user = await prisma.user.findUnique({
    where: { username },
  })

  return user
}

export default signin
