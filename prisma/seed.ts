const { PrismaClient } = require('@prisma/client')
const { generate } = require('prisma-faker')

const prisma = new PrismaClient()

const main = async () => {}

// example:
// async function main() {
//   for (let i = 0; i < 100; i++) {
//     const data = generate({
//       schema: {
//         User: {
//           fields: {
//             name: "name.findName",
//             email: "internet.email",
//             password: "internet.password",
//           },
//         },
//         Post: {
//           fields: {
//             title: "lorem.sentence",
//             content: "lorem.sentences",
//             published: "datatype.boolean",
//             author: {
//               relation: "belongsTo",
//               target: "User",
//             },
//           },
//         },
//       },
//     })

//     await prisma.user.create({
//       data: {
//         name: data.User.name,
//         email: data.User.email,
//         password: data.User.password,
//         posts: {
//           create: data.Post,
//         },
//       },
//     })
//   }
// }

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
