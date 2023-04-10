import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

interface AddActionToMediaArgs {
  mediaUuid: string
  actionType: string
  userUuid: string
}
const addActionToMedia = async (
  _: any,
  { mediaUuid, actionType, userUuid }: AddActionToMediaArgs
) => {
  const action = await prisma.action.create({
    data: {
      type: actionType,
      user: { connect: { uuid: userUuid } },
      mediaActions: { create: { media: { connect: { uuid: mediaUuid } } } },
    },
    include: {
      mediaActions: true,
    },
  })

  return action.mediaActions[0]
}

export default addActionToMedia
