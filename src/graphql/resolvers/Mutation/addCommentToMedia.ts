import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

interface AddCommentToMediaArgs {
  mediaUuid: string
  userUuid: string
  content: string
}

const addCommentToMedia = async (
  _: any,
  { mediaUuid, userUuid, content }: AddCommentToMediaArgs
) => {
  const media = await prisma.media.findUnique({
    where: { uuid: mediaUuid },
  })

  if (!media) {
    throw new Error(`Media with uuid ${mediaUuid} not found`)
  }

  const user = await prisma.user.findUnique({
    where: { uuid: userUuid },
  })

  if (!user) {
    throw new Error(`User with uuid ${userUuid} not found`)
  }

  const comment = await prisma.comment.create({
    data: {
      userUuid,
      mediaUuid,
      content,
    },
  })

  const mediaComment = await prisma.mediaComment.create({
    data: {
      media: { connect: { uuid: mediaUuid } },
      comment: { connect: { uuid: comment.uuid } },
    },
  })

  return mediaComment
}

export default addCommentToMedia
