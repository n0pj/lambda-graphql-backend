import { PrismaClient } from '@prisma/client/index.js'
import { MediaTag } from '@prisma/client/'

const prisma = new PrismaClient()

interface AddTagToMediaArgs {
  mediaUuid: string
  tagUuid: string
  userUuid: string
}

const addTagToMedia = async (
  _: any,
  { mediaUuid, tagUuid, userUuid }: AddTagToMediaArgs
): Promise<MediaTag> => {
  return prisma.mediaTag.create({ data: { mediaUuid, tagUuid } })
}

export default addTagToMedia
