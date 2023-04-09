import { PrismaClient } from '@prisma/client/index.js'

const prisma = new PrismaClient()

/**
 * Query resolvers
 */
const Query = {
  user: async (_parent, { uuid }) => {
    const user = await prisma.user.findUnique({
      where: { uuid },
      include: {
        posts: {
          include: {
            media: {
              include: {
                evaluations: true,
                mediaTags: { include: { tag: true } },
              },
            },
          },
        },
        tags: {
          include: {
            mediaTags: { include: { media: true } },
            tagEvaluations: true,
          },
        },
        evaluations: {
          include: {
            mediaEvaluations: { include: { media: true } },
            tagEvaluations: true,
          },
        },
        mediaActions: { include: { mediaActions: true } },
        favorites: { include: { media: true } },
      },
    })
    return user
  },

  posts: async () => {
    const posts = await prisma.post.findMany({
      include: {
        media: {
          include: {
            evaluations: true,
            mediaTags: { include: { tag: true } },
          },
        },
        user: true,
      },
    })
    return posts
  },

  tags: async (_parent, { uuids }) => {
    const tags = await prisma.tag.findMany({
      where: { uuid: { in: uuids } },
      include: {
        mediaTags: { include: { media: { include: { evaluations: true } } } },
        tagEvaluations: { include: { evaluation: true } },
      },
    })
    return tags
  },

  comments: async (_parent, { mediaUuid }) => {
    const comments = await prisma.comment.findMany({
      where: { mediaUuid },
      include: { user: true, mediaComments: { include: { media: true } } },
    })
    return comments
  },

  media: async (_parent, { uuid }) => {
    const media = await prisma.media.findUnique({
      where: { uuid },
      include: {
        post: true,
        parentMedia: { include: { evaluations: true } },
        childMedias: { include: { evaluations: true } },
        evaluations: true,
        actions: true,
        mediaTags: { include: { tag: true } },
        favorites: { include: { user: true } },
        comments: {
          include: { comment: true },
          orderBy: { createdAt: 'asc' },
        },
      },
    })
    return media
  },
}

export default Query
