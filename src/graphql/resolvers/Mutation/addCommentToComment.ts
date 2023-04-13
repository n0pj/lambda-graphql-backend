import { PrismaClient } from '@prisma/client/index.js'
import ApplicationError, {
  ErrorCode,
} from '../../../libs/ApplicationError/index.js'

const prisma = new PrismaClient()

interface AddCommentToCommentArgs {
  commentUuid: string
  userUuid: string
  content: string
}

const addCommentToComment = async (
  _: any,
  { commentUuid, userUuid, content }: AddCommentToCommentArgs
) => {
  const comment = await prisma.comment.findUnique({
    where: { uuid: commentUuid },
  })

  if (!comment) {
    throw new ApplicationError(
      `Comment with uuid ${commentUuid} not found`,
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

  const subComment = await prisma.comment.create({
    data: {
      user: { connect: { uuid: userUuid } },
      mediaUuid: comment.mediaUuid,
      parentCommentUuid: comment.uuid,
      content,
    },
  })

  const mediaComment = await prisma.mediaComment.create({
    data: {
      media: { connect: { uuid: comment.mediaUuid } },
      comment: { connect: { uuid: subComment.uuid } },
    },
  })

  return subComment
}

export default addCommentToComment
