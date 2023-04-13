import {
  GlobalSignOutCommand,
  CognitoIdentityProviderClient,
} from '@aws-sdk/client-cognito-identity-provider'
import { AWS_REGION } from '../../../constants/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

interface SignoutArgs {
  accessToken: string
}

const signOut = async (_: any, { accessToken }: SignoutArgs) => {
  const client = new CognitoIdentityProviderClient({
    region: AWS_REGION,
  })

  const signOutCommand = new GlobalSignOutCommand({
    AccessToken: accessToken,
  })

  try {
    const response = await client.send(signOutCommand)

    // response:
    // {
    //   '$metadata': {
    //     httpStatusCode: 200,
    //     requestId: 'b4a8b1e4-4d0e-4d2f-9c7f-3d3b4f4d4b8a',
    //     extendedRequestId: undefined,
    //     cfId: undefined,
    //     attempts: 1,
    //     totalRetryDelay: 0
    //   }
    // }
  } catch (error) {
    throw new ApplicationError(
      'Error signing out user. Please try again later.',
      ErrorCode.InternalServerError
    )
  }

  return true
}

export default signOut
