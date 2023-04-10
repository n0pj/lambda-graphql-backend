import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

const media = async (_: any, { uuid }) => {
  const media = await prisma.media.findUnique({
    where: { uuid },
    include: {
      post: true,
      parentMedia: { include: { evaluations: true } },
      childMedias: { include: { evaluations: true } },
      evaluations: true,
      actions: true,
      mediaTags: { include: { tag: true } },
      favorites: { include: { user: true } },
      comments: {
        include: { comment: true },
        orderBy: { createdAt: 'asc' },
      },
    },
  })
  return media
}

export default media
