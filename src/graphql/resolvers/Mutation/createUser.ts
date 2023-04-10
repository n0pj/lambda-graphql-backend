import { PrismaClient } from '@prisma/client/index.js'
import { User } from '@prisma/client/'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

interface CreateUserArgs {
  username: string
}

const createUser = async (
  _: any,
  { username }: CreateUserArgs
): Promise<User> => {
  return prisma.user.create({ data: { username } })
}

export default createUser
