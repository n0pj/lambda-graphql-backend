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

const prisma = new PrismaClient()

const resendConfirmationCodeSchema = yup.object().shape({
  email: yup.string().email().required(),
})

type ResendConfirmationCodeArgs = yup.InferType<
  typeof resendConfirmationCodeSchema
>

const resendConfirmationCode = async (
  _: any,
  { email }: ResendConfirmationCodeArgs
) => {
  try {
    await resendConfirmationCodeSchema.validate({ email })
  } catch (error) {
    console.log('Error validating resendConfirmationCode input:', error)
    throw new Error(error)
  }

  const client = new CognitoIdentityProviderClient({ region: AWS_REGION })

  const resendConfirmationCodeCommand = new ResendConfirmationCodeCommand({
    ClientId: COGNITO_CLIENT_ID,
    SecretHash: generateSecretHash(
      COGNITO_CLIENT_ID,
      COGNITO_CLIENT_SECRET,
      email
    ),
    Username: email,
  })

  try {
    const response = await client.send(resendConfirmationCodeCommand)
    console.log('response:', response)
  } catch (error) {
    console.log('Error confirming sign up:', error)
    throw new Error('Error confirming sign up. Please try again later.')
  }

  return true
}

export default resendConfirmationCode
