import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
} from '../../../constants/index.js'
import { ResAuthenticationResult } from 'src/graphql/__generated__/schema.js'

const changeUserDetailsSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
})

type ChangeUserDetailsSchema = yup.InferType<typeof changeUserDetailsSchema>

const changeUserDetails = async (
  _: any,
  { email, password }: ChangeUserDetailsSchema
) => {
  try {
    await changeUserDetailsSchema.validate(
      { email, password },
      { abortEarly: false }
    )
  } catch (error) {
    console.log('Error validating changeUserDetails input:', error)
    throw new Error(error)
  }

  const client = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })
  const secretHash = generateSecretHash(
    COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET,
    email
  )

  //   return authenticationResult
}

export default changeUserDetails
