import {
  CognitoIdentityProviderClient,
  UpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
} from '../../../constants/index.js'

const changeUserDetailsSchema = yup.object({
  accessToken: yup.string().required(),
  newEmail: yup.string().email().required(),
})

type ChangeUserDetailsSchema = yup.InferType<typeof changeUserDetailsSchema>

const changeUserDetails = async (
  _: any,
  { accessToken, newEmail }: ChangeUserDetailsSchema
) => {
  try {
    await changeUserDetailsSchema.validate(
      { accessToken, newEmail },
      { abortEarly: false }
    )
  } catch (error) {
    console.log('Error validating changeUserDetails input:', error)
    throw new Error(error)
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
    throw new Error('Error updating user attributes. Please try again later.')
  }

  return true
}

export default changeUserDetails
