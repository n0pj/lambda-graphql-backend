import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import { z } from 'zod'

const prisma = new PrismaClient()

const signInSchema = z.object({
  email: z.string().email(),
  // カスタマイズしたパスワードポリシーに合わせる
  // パスワードの最小文字数
  // 8 文字
  // パスワード要件
  // 少なくとも 1 つの数字を含む
  // 少なくとも 1 つの特殊文字を含む
  // 少なくとも 1 つの大文字を含む
  // 少なくとも 1 つの小文字を含む
  password: z
    .string()
    .min(8)
    .regex(/[0-9]/)
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)
    .regex(/[A-Z]/)
    .regex(/[a-z]/),
})

type SignInArgs = z.infer<typeof signInSchema>

const signIn = async (_: any, { email, password }: SignInArgs) => {
  const result = signInSchema.safeParse({ email, password })
  if (result.success) {
  } else {
    const errors = result
    console.log(errors)
  }

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

    throw new Error(error)
  }

  return authenticationResult
}

export default signIn
