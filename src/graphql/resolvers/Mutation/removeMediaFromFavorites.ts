import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

interface RemoveMediaFromFavoritesArgs {
  favoriteUuid: string
}

const removeMediaFromFavorites = async (
  _: any,
  { favoriteUuid }: RemoveMediaFromFavoritesArgs
) => {
  const favorite = await prisma.favorite.delete({
    where: {
      uuid: favoriteUuid,
    },
  })

  return favorite
}

export default removeMediaFromFavorites
