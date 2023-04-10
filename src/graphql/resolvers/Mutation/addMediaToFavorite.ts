import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

interface AddMediaToFavoritesArgs {
  mediaUuid: string
  userUuid: string
}

const addMediaToFavorites = async (
  _: any,
  { mediaUuid, userUuid }: AddMediaToFavoritesArgs
) => {
  const favorite = await prisma.favorite.create({
    data: {
      user: { connect: { uuid: userUuid } },
      media: { connect: { uuid: mediaUuid } },
    },
  })

  return favorite
}

export default addMediaToFavorites
