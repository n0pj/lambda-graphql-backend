import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import * as yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
} from '../../../constants/index.js'

const prisma = new PrismaClient()

const confirmSignUpSchema = yup.object().shape({
  // uuidv4
  uuid: yup.string().min(36).max(36).required(),
  code: yup.string().min(6).required(),
})

type ConfirmSignUpArgs = yup.InferType<typeof confirmSignUpSchema>

const configmSignUp = async (_: any, { uuid, code }: ConfirmSignUpArgs) => {
  try {
    await confirmSignUpSchema.validate({ uuid, code })
  } catch (error) {
    console.log('Error validating configmSignUp input:', error)
    throw new Error(error)
  }

  const client = new CognitoIdentityProviderClient({ region: AWS_REGION })
  const signUpCommand = new ConfirmSignUpCommand({
    ClientId: COGNITO_CLIENT_ID,
    SecretHash: generateSecretHash(
      COGNITO_CLIENT_ID,
      COGNITO_CLIENT_SECRET,
      uuid
    ),
    Username: uuid,
    ConfirmationCode: code,
  })

  try {
    await client.send(signUpCommand)
  } catch (error) {
    console.log('Error confirming sign up:', error)
    throw new Error('Error confirming sign up. Please try again later.')
  }

  return true
}

export default configmSignUp
