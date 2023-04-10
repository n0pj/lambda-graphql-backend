import { PrismaClient } from '@prisma/client/index.js'
import { TagEvaluation } from '@prisma/client/'

const prisma = new PrismaClient()

interface AddEvaluationToTagArgs {
  tagUuid: string
  evaluationUuid: string
  userUuid: string
}

const addEvaluationToTag = async (
  _: any,
  { tagUuid, evaluationUuid, userUuid }: AddEvaluationToTagArgs
): Promise<TagEvaluation> => {
  return prisma.tagEvaluation.create({
    data: { tagUuid, evaluationUuid },
  })
}

export default addEvaluationToTag
