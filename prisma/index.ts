import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const alice = await prisma.User.findMany({})

  console.log(alice)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
