import { PrismaClient } from '@prisma/client/index.js'
import {
  CognitoIdentityProviderClient,
  VerifyUserAttributeCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import yup from 'yup'
import { AWS_REGION } from '../../../constants/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

const prisma = new PrismaClient()

const verifyEmailSchema = yup.object({
  accessToken: yup.string().required(),
  newEmail: yup.string().email().required(),
  beforeEmail: yup.string().email().required(),
  code: yup.string().min(6).required(),
})

type VerifyEmailSchema = yup.InferType<typeof verifyEmailSchema>

const verifyEmail = async (
  _: any,
  { accessToken, newEmail, beforeEmail, code }: VerifyEmailSchema
) => {
  try {
    await verifyEmailSchema.validate(
      { accessToken, newEmail, beforeEmail, code },
      { abortEarly: false }
    )
  } catch (error) {
    console.log('Error validating verifyEmail input:', error)
    throw new ApplicationError(
      'Error validating verifyEmail input.',
      ErrorCode.ValidationError,
      error.innner
    )
  }

  const client = new CognitoIdentityProviderClient({ region: AWS_REGION })
  const verifyUserAttributeCommand = new VerifyUserAttributeCommand({
    AccessToken: accessToken,
    AttributeName: 'email',
    Code: code,
  })

  // start transaction
  // update user email
  await prisma.$transaction(async () => {
    prisma.user.update({
      where: { email: beforeEmail },
      data: { email: newEmail },
    })

    try {
      const data = await client.send(verifyUserAttributeCommand)
      console.log('data:', data)
    } catch (error) {
      console.log('error:', error)
      throw new ApplicationError(
        'Error updating user attributes. Please try again later.',
        ErrorCode.InternalServerError
      )
    }
  })

  return true
}

export default verifyEmail
