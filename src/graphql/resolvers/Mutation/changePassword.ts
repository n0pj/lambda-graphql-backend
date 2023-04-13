import {
  CognitoIdentityProviderClient,
  ChangePasswordCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import yup from 'yup'
import { AWS_REGION } from '../../../constants/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'
import { passwordSchema } from '../../../constants/validations.js'

const changePasswordSchema = yup.object({
  newPassword: passwordSchema.required(),
  oldPassword: yup.string().required(),
  accessToken: yup.string().required(),
})

type ChangePasswordArgs = yup.InferType<typeof changePasswordSchema>

const changePassword = async (
  _: any,
  { newPassword, oldPassword, accessToken }: ChangePasswordArgs
) => {
  try {
    await changePasswordSchema.validate(
      {
        newPassword,
        oldPassword,
        accessToken,
      },
      { abortEarly: false }
    )
  } catch (error) {
    console.log('Error validating changePassword input:', error)
    throw new ApplicationError(
      'Error validating changePassword input.',
      ErrorCode.ValidationError,
      error.inner
    )
  }

  const cognitoClient = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })

  const changePasswordCommand = new ChangePasswordCommand({
    AccessToken: accessToken,
    PreviousPassword: oldPassword,
    ProposedPassword: newPassword,
  })

  try {
    const res = await cognitoClient.send(changePasswordCommand)
  } catch (error) {
    throw new ApplicationError('failed to change password.', error.message)
  }

  return true
}

export default changePassword
