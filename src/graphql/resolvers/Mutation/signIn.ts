import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
} from '../../../constants/index.js'

const signInSchema = yup.object({
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .required(),
})

type SignInArgs = yup.InferType<typeof signInSchema>

const signIn = async (_: any, { email, password }: SignInArgs) => {
  try {
    await signInSchema.validate({ email, password }, { abortEarly: false })
  } catch (error) {
    console.log('Error validating signIn input:', error)
    throw new Error(error)
  }

  const client = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })
  const secretHash = generateSecretHash(
    COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET,
    email
  )

  const signInCommand = new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: COGNITO_CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
      SECRET_HASH: secretHash,
    },
  })

  let authenticationResult

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
    authenticationResult = response.AuthenticationResult

    console.log(response)
    console.log('User signed in successfully')
  } catch (error) {
    console.log('Error signing in user:', error)

    throw new Error('Error signing in user. Please try again later.')
  }

  return authenticationResult
}

export default signIn
