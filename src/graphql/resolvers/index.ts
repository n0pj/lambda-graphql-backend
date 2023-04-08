import { PrismaClient } from '@prisma/client'
import Query from './Query'

const prisma = new PrismaClient()

export const resolvers = {
  Query,
  Mutation: {},
}
