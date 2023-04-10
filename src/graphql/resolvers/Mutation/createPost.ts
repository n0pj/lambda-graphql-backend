import { PrismaClient } from '@prisma/client/index.js'
import { Post } from '@prisma/client/'

const prisma = new PrismaClient()

interface CreatePostArgs {
  userUuid: string
  title?: string
  content?: string
}

const createPost = async (
  _: any,
  { userUuid, title, content }: CreatePostArgs
): Promise<Post> => {
  return prisma.post.create({ data: { userUuid, title, content } })
}

export default createPost
