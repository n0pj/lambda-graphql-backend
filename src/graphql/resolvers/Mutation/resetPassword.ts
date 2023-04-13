import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  ForgotPasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
} from '../../../constants/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

const prisma = new PrismaClient()

const resetPasswordSchema = yup.object({
  email: yup.string().email().required(),
})

type ResetPasswordArgs = yup.InferType<typeof resetPasswordSchema>

const resetPassword = async (_: any, { email }: ResetPasswordArgs) => {
  try {
    await resetPasswordSchema.validate({ email })
  } catch (error) {
    throw new ApplicationError(ErrorCode.ValidationError, error.inner)
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })

  const forgotPasswordCommand = new ForgotPasswordCommand({
    ClientId: COGNITO_CLIENT_ID,
    SecretHash: generateSecretHash(
      COGNITO_CLIENT_ID,
      COGNITO_CLIENT_SECRET,
      email
    ),
    Username: email,
  })

  try {
    const res = await cognitoClient.send(forgotPasswordCommand)
  } catch (error) {
    throw new ApplicationError('failed to reset password.', error.message)
  }

  return true
}

export default resetPassword
