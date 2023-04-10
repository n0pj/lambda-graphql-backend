import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

interface AddEvaluationToMediaArgs {
  mediaUuid: string
  evaluationUuid: string
  userUuid: string
}

const addEvaluationToMedia = async (
  _: any,
  { mediaUuid, evaluationUuid, userUuid }: AddEvaluationToMediaArgs
) => {
  const mediaEvaluation = await prisma.mediaEvaluation.create({
    data: {
      media: { connect: { uuid: mediaUuid } },
      evaluation: { connect: { uuid: evaluationUuid } },
    },
  })

  return mediaEvaluation
}

export default addEvaluationToMedia
