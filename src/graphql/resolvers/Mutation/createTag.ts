import { PrismaClient } from '@prisma/client/index.js'
import { Tag } from '@prisma/client/'

const prisma = new PrismaClient()

interface CreateTagArgs {
  name: string
  userUuid: string
}

const createTag = async (
  _: any,
  { name, userUuid }: CreateTagArgs
): Promise<Tag> => {
  return prisma.tag.create({ data: { name, userUuid } })
}

export default createTag
