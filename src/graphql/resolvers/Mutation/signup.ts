import { PrismaClient } from '@prisma/client/index.js'
import { v4 as uuidv4 } from 'uuid'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'

const prisma = new PrismaClient()

interface SignupArgs {
  username: string
  email: string
  phoneNumber: string
  password: string
}

const signup = async (
  _: any,
  { email, username, phoneNumber, password }: SignupArgs
) => {
  const AWS_REGION = process.env.AWS_REGION
  const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET
  const CLIENT_ID = process.env.COGNITO_CLIENT_ID
  const client = new CognitoIdentityProviderClient({ region: AWS_REGION })
  const uuid = uuidv4()

  const signUpCommand = new SignUpCommand({
    ClientId: CLIENT_ID,
    SecretHash: generateSecretHash(CLIENT_ID, CLIENT_SECRET, uuid),
    Username: uuid,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'phone_number',
        Value: phoneNumber,
      },
      {
        Name: 'custom:uuid',
        Value: uuid,
      },
      {
        Name: 'nickname',
        Value: username,
      },
    ],
  })

  try {
    const response = await client.send(signUpCommand)
    console.log('User signed up successfully')
  } catch (error) {
    console.log('Error signing up user:', error)
    throw new Error(error)
  }

  const user = await prisma.user.create({
    data: {
      uuid,
      // email,
      username,
      // phoneNumber,
    },
  })

  return user
}

export default signup
