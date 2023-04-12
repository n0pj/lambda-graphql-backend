import { PrismaClient } from '@prisma/client/index.js'
import { v4 as uuidv4 } from 'uuid'
import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  // AdminConfirmSignUpCommand,
  // AdminUpdateUserAttributesCommand,
} from '@aws-sdk/client-cognito-identity-provider'
import generateSecretHash from '../../../libs/auth/generateSecretHash.js'
import * as yup from 'yup'

const prisma = new PrismaClient()

const signUpSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().min(8).required(),
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
    await signUpSchema.validate({ email, username, password })
  } catch (error) {
    console.log('Error validating signUp input:', error)
    throw new Error(error)
  }

  const AWS_REGION = process.env.AWS_REGION
  const CLIENT_ID = process.env.COGNITO_CLIENT_ID
  const CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET
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
    throw new Error('Username is already taken.')
  }

  // start transaction
  return await prisma.$transaction(async (prisma) => {
    const user = await prisma.user.create({
      data: {
        uuid,
        // email,
        username,
        // phoneNumber,
      },
    })

    // サインアップ
    const signUpCommand = new SignUpCommand({
      ClientId: CLIENT_ID,
      SecretHash: generateSecretHash(CLIENT_ID, CLIENT_SECRET, uuid),
      Username: uuid,
      Password: password,
      // SecretHash: generateSecretHash(CLIENT_ID, CLIENT_SECRET, uuid),
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'nickname',
          Value: username,
        },
      ],
    })

    // // ユーザーのステータスを CONFIRMED にする
    // const adminConfirmSignUpCommand = new AdminConfirmSignUpCommand({
    //   UserPoolId: process.env.COGNITO_USER_POOL_ID,
    //   Username: uuid,
    // })

    // // ユーザーの email_verified を更新する
    // const adminUpdateUserAttributesCommand =
    //   new AdminUpdateUserAttributesCommand({
    //     UserPoolId: process.env.COGNITO_USER_POOL_ID,
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
      console.log('User signed up successfully')
    } catch (error) {
      console.log('Error signing up user:', error)
      throw new Error('Failed to sign up user.')
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
