import { PrismaClient } from '@prisma/client/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

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
    throw new ApplicationError(
      `Media with uuid ${mediaUuid} not found`,
      ErrorCode.NotFoundError
    )
  }

  const user = await prisma.user.findUnique({
    where: { uuid: userUuid },
  })

  if (!user) {
    throw new ApplicationError(
      `User with uuid ${userUuid} not found`,
      ErrorCode.NotFoundError
    )
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
