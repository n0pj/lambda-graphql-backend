import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import * as yup from 'yup'

const prisma = new PrismaClient()

const confirmSignUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  code: yup.string().min(6).required(),
})

type ConfirmSignUpArgs = yup.InferType<typeof confirmSignUpSchema>

const configmSignUp = async (_: any, { email, code }: ConfirmSignUpArgs) => {
  try {
    await confirmSignUpSchema.validate({ email, code })
  } catch (error) {
    console.log('Error validating configmSignUp input:', error)
    throw new Error(error)
  }

  const AWS_REGION = process.env.AWS_REGION
  const CLIENT_ID = process.env.COGNITO_CLIENT_ID
  const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET
  const client = new CognitoIdentityProviderClient({ region: AWS_REGION })
  const signUpCommand = new ConfirmSignUpCommand({
    ClientId: CLIENT_ID,
    SecretHash: generateSecretHash(CLIENT_ID, CLIENT_SECRET, email),
    Username: email,
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
