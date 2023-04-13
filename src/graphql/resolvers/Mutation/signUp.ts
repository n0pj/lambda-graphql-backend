import { PrismaClient } from '@prisma/client/index.js'
import { v4 as uuidv4 } from 'uuid'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  AdminGetUserCommand,
  // AdminConfirmSignUpCommand,
  // AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import yup from 'yup'
import {
  AWS_REGION,
  COGNITO_CLIENT_ID,
  COGNITO_CLIENT_SECRET,
  COGNITO_USER_POOL_ID,
} from '../../../constants/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

const prisma = new PrismaClient()

const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().min(4).required(),
  // パスワード要件
  // 少なくとも 1 つの数字を含む
  // 少なくとも 1 つの特殊文字を含む
  // 少なくとも 1 つの大文字を含む
  // 少なくとも 1 つの小文字を含む
  // 8 文字以上
  password: yup
    .string()
    .min(8)
    .matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}$/)
    .required(),
})

type SignUpArgs = yup.InferType<typeof signUpSchema>

const signUp = async (_: any, { email, username, password }: SignUpArgs) => {
  try {
    await signUpSchema.validate(
      { email, username, password },
      { abortEarly: false }
    )
  } catch (error) {
    console.log('Error validating signUp input:', error)
    throw new ApplicationError(
      'Error validating signUp input.',
      ErrorCode.ValidationError,
      error.inner
    )
  }

  const client = new CognitoIdentityProviderClient({ region: AWS_REGION })
  const uuid = uuidv4()

  // const signUpCommand = new SignUpCommand({
  //   ClientId: CLIENT_ID,
  //   SecretHash: generateSecretHash(CLIENT_ID, CLIENT_SECRET, uuid),
  //   Username: uuid,
  //   Password: password,
  //   // SecretHash: generateSecretHash(CLIENT_ID, CLIENT_SECRET, uuid),
  //   UserAttributes: [
  //     {
  //       Name: 'email',
  //       Value: email,
  //     },
  //     {
  //       Name: 'nickname',
  //       Value: username,
  //     },
  //   ],
  // })

  const existingUser = await prisma.user.findUnique({ where: { username } })

  if (existingUser) {
    throw new ApplicationError(
      'Username is already taken.',
      ErrorCode.UsernameExistsException
    )
  }

  // Check if user with given email already exists in Cognito
  const getUserCommand = new AdminGetUserCommand({
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: username,
  })

  try {
    const _ = await client.send(getUserCommand)
    console.log('User already exists in Cognito')
    throw new ApplicationError(
      'Email is already taken.',
      ErrorCode.EmailExistsException
    )
  } catch (error) {
    // console.log('Error getting user from Cognito:', error)
    if (error.__type !== 'UserNotFoundException') {
      // console.log('Error getting user from Cognito:', error)
      throw new ApplicationError(
        'Error getting user.',
        ErrorCode.InternalServerError
      )
    }
  }

  // start transaction
  return await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        uuid,
        email,
        username,
        // phoneNumber,
      },
    })

    // サインアップ
    const signUpCommand = new SignUpCommand({
      ClientId: COGNITO_CLIENT_ID,
      SecretHash: generateSecretHash(
        COGNITO_CLIENT_ID,
        COGNITO_CLIENT_SECRET,
        uuid
      ),
      Username: uuid,
      Password: password,
      // SecretHash: generateSecretHash(CLIENT_ID, CLIENT_SECRET, uuid),
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    })

    // // ユーザーのステータスを CONFIRMED にする
    // const adminConfirmSignUpCommand = new AdminConfirmSignUpCommand({
    //   UserPoolId: COGNITO_USER_POOL_ID,
    //   Username: uuid,
    // })

    // // ユーザーの email_verified を更新する
    // const adminUpdateUserAttributesCommand =
    //   new AdminUpdateUserAttributesCommand({
    //     UserPoolId: COGNITO_USER_POOL_ID,
    //     Username: uuid,
    //     UserAttributes: [
    //       {
    //         Name: 'email_verified',
    //         Value: 'true',
    //       },
    //     ],
    //   })

    try {
      const _ = await client.send(signUpCommand)
    } catch (error) {
      throw new ApplicationError(
        'Error signing up user.',
        ErrorCode.InternalServerError
      )
    }

    // try {
    //   const _ = await client.send(adminConfirmSignUpCommand)
    //   console.log('User confirmed successfully')
    // } catch (error) {
    //   console.log('Error confirming user:', error)
    //   throw new Error(error)
    // }

    // try {
    //   const _ = await client.send(adminUpdateUserAttributesCommand)
    //   console.log('User email_verified updated successfully')
    // } catch (error) {
    //   console.log('Error updating user email_verified:', error)
    //   throw new Error(error)
    // }

    return user
  })
}

export default signUp
