import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  UserNotConfirmedException,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
} from '../../../constants/index.js'
import { ResAuthenticationResult } from 'src/graphql/__generated__/schema.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

const prisma = new PrismaClient()

const signInSchema = yup.object({
  // username or email
  signInIdentifier: yup.string().required(),
  password: yup.string().min(8).required(),
})

type SignInArgs = yup.InferType<typeof signInSchema>

const signIn = async (_: any, { signInIdentifier, password }: SignInArgs) => {
  try {
    await signInSchema.validate(
      { signInIdentifier, password },
      { abortEarly: false }
    )
  } catch (error) {
    console.log('Error validating signIn input:', error)
    throw new ApplicationError(
      'Error validating signIn input.',
      ErrorCode.ValidationError,
      error.inner
    )
  }

  // メールアドレスかユーザー名かを判定する
  const email = signInIdentifier.includes('@') ? signInIdentifier : undefined
  const username = !email ? signInIdentifier : undefined
  let uuid

  // username だった場合、データベースより User.uuid を取得する
  if (username) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    })

    if (!user) {
      throw new ApplicationError(
        'Error signing in user. Please try again later.',
        ErrorCode.NotFoundError
      )
    }

    uuid = user.uuid
  }

  // email だった場合、データベースより User.uuid を取得する
  if (email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      throw new ApplicationError(
        'Error signing in user. Please try again later.',
        ErrorCode.NotFoundError
      )
    }

    uuid = user.uuid
  }

  const client = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })
  const secretHash = generateSecretHash(
    COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET,
    uuid
  )

  const signInCommand = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: uuid,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  })

  let authenticationResult: ResAuthenticationResult

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

    // transfer response.AuthenticationResult to authenticationResult
    authenticationResult = {
      accessToken: response.AuthenticationResult.AccessToken,
      expiresIn: response.AuthenticationResult.ExpiresIn,
      idToken: response.AuthenticationResult.IdToken,
      refreshToken: response.AuthenticationResult.RefreshToken,
      tokenType: response.AuthenticationResult.TokenType,
    }

    // console.log(response)
    // console.log('User signed in successfully')
  } catch (error) {
    if (error instanceof UserNotConfirmedException) {
      console.log('User not confirmed:', error)
      // ユーザーが確認されていない場合の処理
      throw new ApplicationError(
        'User not confirmed. Please confirm your email address.',
        ErrorCode.UserNotConfirmedException
      )
    } else {
      console.log('Error signing in user:', error)
      throw new ApplicationError(
        'Error signing in user. Please try again later.',
        ErrorCode.UnknownError
      )
    }
  }

  return authenticationResult
}

export default signIn
