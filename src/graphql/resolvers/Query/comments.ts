import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

const comments = async (_: any, { mediaUuid }) => {
  const comments = await prisma.comment.findMany({
    where: { mediaUuid },
    include: { user: true, mediaComments: { include: { media: true } } },
  })
  return comments
}

export default comments
