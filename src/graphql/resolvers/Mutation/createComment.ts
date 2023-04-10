import { PrismaClient } from '@prisma/client/index.js'
import { Comment } from '@prisma/client/'
import dotenv from 'dotenv'

const prisma = new PrismaClient()

interface CreateCommentArgs {
  userUuid: string
  mediaUuid: string
  content: string
}

const createComment = async (
  _: any,
  { userUuid, mediaUuid, content }: CreateCommentArgs
): Promise<Comment> => {
  return prisma.comment.create({ data: { userUuid, mediaUuid, content } })
}

export default createComment
