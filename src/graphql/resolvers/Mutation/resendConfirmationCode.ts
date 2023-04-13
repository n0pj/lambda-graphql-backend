import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  ResendConfirmationCodeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import * as yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
} from '../../../constants/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

const prisma = new PrismaClient()

const resendConfirmationCodeSchema = yup.object().shape({
  // uuidv4
  uuid: yup.string().min(36).max(36).required(),
})

type ResendConfirmationCodeArgs = yup.InferType<
  typeof resendConfirmationCodeSchema
>

const resendConfirmationCode = async (
  _: any,
  { uuid }: ResendConfirmationCodeArgs
) => {
  try {
    await resendConfirmationCodeSchema.validate({ uuid })
  } catch (error) {
    console.log('Error validating resendConfirmationCode input:', error)
    throw new ApplicationError(
      'Error validating resendConfirmationCode input.',
      ErrorCode.ValidationError,
      error.inner
    )
  }

  const client = new CognitoIdentityProviderClient({ region: AWS_REGION })

  const resendConfirmationCodeCommand = new ResendConfirmationCodeCommand({
    ClientId: COGNITO_CLIENT_ID,
    SecretHash: generateSecretHash(
      COGNITO_CLIENT_ID,
      COGNITO_CLIENT_SECRET,
      uuid
    ),
    Username: uuid,
  })

  try {
    const response = await client.send(resendConfirmationCodeCommand)
    console.log('response:', response)
  } catch (error) {
    console.log('Error confirming sign up:', error)
    throw new ApplicationError(
      'Error confirming sign up.',
      ErrorCode.InternalServerError
    )
  }

  return true
}

export default resendConfirmationCode
