import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

const posts = async (_: any, {}) => {
  const posts = await prisma.post.findMany({
    include: {
      media: {
        include: {
          evaluations: true,
          mediaTags: { include: { tag: true } },
        },
      },
      user: true,
    },
  })
  return posts
}

export default posts
