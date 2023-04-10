import { PrismaClient } from '@prisma/client/index.js'

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
    throw new Error(`Comment with uuid ${commentUuid} not found`)
  }

  const user = await prisma.user.findUnique({
    where: { uuid: userUuid },
  })

  if (!user) {
    throw new Error(`User with uuid ${userUuid} not found`)
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
