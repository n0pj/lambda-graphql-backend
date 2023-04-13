import {
  CognitoIdentityProviderClient,
  UpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import yup from 'yup'
import { AWS_REGION } from '../../../constants/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

const changeEmailChema = yup.object({
  accessToken: yup.string().required(),
  newEmail: yup.string().email().required(),
})

type ChangeEmailArgs = yup.InferType<typeof changeEmailChema>

const changeEmail = async (
  _: any,
  { accessToken, newEmail }: ChangeEmailArgs
) => {
  try {
    await changeEmailChema.validate(
      { accessToken, newEmail },
      { abortEarly: false }
    )
  } catch (error) {
    throw new ApplicationError(
      'Error validating changeEmail input.',
      ErrorCode.ValidationError,
      error.inner
    )
  }

  const client = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })

  const updateUserAttributesCommand = new UpdateUserAttributesCommand({
    AccessToken: accessToken,
    UserAttributes: [
      {
        Name: 'email',
        Value: newEmail,
      },
    ],
  })

  try {
    const data = await client.send(updateUserAttributesCommand)
    console.log('data:', data)
  } catch (error) {
    console.log('error:', error)
    throw new ApplicationError(
      'Error updating user attributes. Please try again later.',
      ErrorCode.InternalServerError
    )
  }

  return true
}

export default changeEmail
