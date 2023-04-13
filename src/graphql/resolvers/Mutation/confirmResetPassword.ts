import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
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
import { passwordSchema } from '../../../constants/validations.js'

const prisma = new PrismaClient()

const confirmResetPasswordSchema = yup.object({
  code: yup.string().required(),
  email: yup.string().email().required(),
  newPassword: passwordSchema.required(),
})

type ConfirmResetPasswordArgs = yup.InferType<typeof confirmResetPasswordSchema>

const confirmResetPassword = async (
  _: any,
  { email, code, newPassword }: ConfirmResetPasswordArgs
) => {
  try {
    await confirmResetPasswordSchema.validate({ email, code, newPassword })
  } catch (error) {
    throw new ApplicationError(
      'validation error.',
      ErrorCode.ValidationError,
      error.inner
    )
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })

  const confirmForgotPasswordCommand = new ConfirmForgotPasswordCommand({
    ClientId: COGNITO_CLIENT_ID,
    SecretHash: generateSecretHash(
      COGNITO_CLIENT_ID,
      COGNITO_CLIENT_SECRET,
      email
    ),
    Username: email,
    ConfirmationCode: code,
    Password: newPassword,
  })

  try {
    const res = await cognitoClient.send(confirmForgotPasswordCommand)

    console.log(res)
  } catch (error) {
    console.log(error)

    throw new ApplicationError('failed to reset password.', error.message)
  }

  return true
}

export default confirmResetPassword
