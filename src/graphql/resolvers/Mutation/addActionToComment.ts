import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

interface AddActionToCommentArgs {
  commentUuid: string
  actionType: string
  userUuid: string
}

const addActionToComment = async (
  _: any,
  { commentUuid, actionType, userUuid }: AddActionToCommentArgs
) => {
  const action = await prisma.action.create({
    data: {
      type: actionType,
      user: { connect: { uuid: userUuid } },
      commentAction: {
        create: { comment: { connect: { uuid: commentUuid } } },
      },
    },
    include: {
      commentAction: true,
    },
  })

  return action.commentAction
}

export default addActionToComment
