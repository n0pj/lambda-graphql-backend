import { PrismaClient } from '@prisma/client/index.js'
import Query from './Query/index.js'
import Mutation from './Mutation/index.js'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'

const prisma = new PrismaClient()

const resolvers = {
  Upload: GraphQLUpload,
  Query,
  Mutation,
}

export default resolvers
