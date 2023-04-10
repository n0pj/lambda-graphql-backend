import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

const tags = async (_: any, { uuids }) => {
  const tags = await prisma.tag.findMany({
    where: { uuid: { in: uuids } },
    include: {
      mediaTags: { include: { media: { include: { evaluations: true } } } },
      tagEvaluations: { include: { evaluation: true } },
    },
  })
  return tags
}

export default tags
