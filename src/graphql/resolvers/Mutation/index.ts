import { PrismaClient } from '@prisma/client/index.js'
import { S3 } from '@aws-sdk/client-s3'
import {
  User,
  Post,
  Media,
  Tag,
  Comment,
  MediaTag,
  TagEvaluation,
} from '@prisma/client/'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { MutationCreateMediaArgs } from '../../__generated__/schema'

// s3 config
dotenv.config()
const s3 = new S3({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
})

const prisma = new PrismaClient()

interface CreateUserArgs {
  username: string
}

interface CreatePostArgs {
  userUuid: string
  title?: string
  content?: string
}

interface CreateMediaArgs {
  postUuid: string
  file: Buffer
  filename: string
  contentType: string
  width: number
  height: number
  ratio: number
}

interface CreateTagArgs {
  name: string
  userUuid: string
}

interface CreateCommentArgs {
  userUuid: string
  mediaUuid: string
  content: string
}

interface AddTagToMediaArgs {
  mediaUuid: string
  tagUuid: string
  userUuid: string
}

interface AddEvaluationToTagArgs {
  tagUuid: string
  evaluationUuid: string
  userUuid: string
}

interface AddEvaluationToMediaArgs {
  mediaUuid: string
  evaluationUuid: string
  userUuid: string
}

interface AddActionToMediaArgs {
  mediaUuid: string
  actionType: string
  userUuid: string
}

interface AddActionToCommentArgs {
  commentUuid: string
  actionType: string
  userUuid: string
}

interface AddMediaToFavoritesArgs {
  mediaUuid: string
  userUuid: string
}

interface RemoveMediaFromFavoritesArgs {
  favoriteUuid: string
}

interface AddCommentToMediaArgs {
  mediaUuid: string
  userUuid: string
  content: string
}

interface AddCommentToCommentArgs {
  commentUuid: string
  userUuid: string
  content: string
}

/**
 * Mutation resolvers
 */
const Mutation = {
  async createUser({ username }: CreateUserArgs): Promise<User> {
    return prisma.user.create({ data: { username } })
  },

  async createPost({
    userUuid,
    title,
    content,
  }: CreatePostArgs): Promise<Post> {
    return prisma.post.create({ data: { userUuid, title, content } })
  },

  async createMedia(
    _,
    {
      file,
      filename,
      contentType,
      width,
      height,
      ratio,
    }: MutationCreateMediaArgs
  ): Promise<Media> {
    const { createReadStream } = await file

    console.log(createReadStream)

    console.log(
      'createMedia',
      file,
      filename,
      contentType,
      width,
      height,
      ratio
    )

    console.log(file)

    // get s3 key and bucket from env
    // S3にファイルをアップロードする
    const s3Key = `${uuidv4()}/${filename}`
    const s3Bucket = process.env.S3_BUCKET as string
    await s3.putObject({
      Bucket: s3Bucket,
      Key: s3Key,
      Body: file,
      ContentType: contentType,
    })

    return prisma.media.create({
      data: { post: {}, filename, width, height, ratio, s3Key, s3Bucket },
      include: { post: true },
    })
  },

  async createTag({ name, userUuid }: CreateTagArgs): Promise<Tag> {
    return prisma.tag.create({ data: { name, userUuid } })
  },

  async createComment({
    userUuid,
    mediaUuid,
    content,
  }: CreateCommentArgs): Promise<Comment> {
    return prisma.comment.create({ data: { userUuid, mediaUuid, content } })
  },

  async addTagToMedia({
    mediaUuid,
    tagUuid,
    userUuid,
  }: AddTagToMediaArgs): Promise<MediaTag> {
    return prisma.mediaTag.create({ data: { mediaUuid, tagUuid } })
  },

  async addEvaluationToTag({
    tagUuid,
    evaluationUuid,
    userUuid,
  }: AddEvaluationToTagArgs): Promise<TagEvaluation> {
    return prisma.tagEvaluation.create({
      data: { tagUuid, evaluationUuid },
    })
  },

  addEvaluationToMedia: async (
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
  },

  addActionToMedia: async (
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
  },

  addActionToComment: async (
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
  },

  addMediaToFavorites: async (
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
  },

  removeMediaFromFavorites: async (
    _: any,
    { favoriteUuid }: RemoveMediaFromFavoritesArgs
  ) => {
    const favorite = await prisma.favorite.delete({
      where: {
        uuid: favoriteUuid,
      },
    })

    return favorite
  },
  addCommentToMedia: async (
    _: any,
    { mediaUuid, userUuid, content }: AddCommentToMediaArgs
  ) => {
    const media = await prisma.media.findUnique({
      where: { uuid: mediaUuid },
    })

    if (!media) {
      throw new Error(`Media with uuid ${mediaUuid} not found`)
    }

    const user = await prisma.user.findUnique({
      where: { uuid: userUuid },
    })

    if (!user) {
      throw new Error(`User with uuid ${userUuid} not found`)
    }

    const comment = await prisma.comment.create({
      data: {
        userUuid,
        mediaUuid,
        content,
      },
    })

    const mediaComment = await prisma.mediaComment.create({
      data: {
        media: { connect: { uuid: mediaUuid } },
        comment: { connect: { uuid: comment.uuid } },
      },
    })

    return mediaComment
  },

  addCommentToComment: async (
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
  },
}

export default Mutation
