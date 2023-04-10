import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

const user = async (_: any, { uuid }) => {
  const user = await prisma.user.findUnique({
    where: { uuid },
    include: {
      posts: {
        include: {
          media: {
            include: {
              evaluations: true,
              mediaTags: { include: { tag: true } },
            },
          },
        },
      },
      tags: {
        include: {
          mediaTags: { include: { media: true } },
          tagEvaluations: true,
        },
      },
      evaluations: {
        include: {
          mediaEvaluations: { include: { media: true } },
          tagEvaluations: true,
        },
      },
      mediaActions: { include: { mediaActions: true } },
      favorites: { include: { media: true } },
    },
  })
  return user
}

export default user
