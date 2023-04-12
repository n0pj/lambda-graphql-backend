import { PrismaClient } from '@prisma/client/index.js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import {
  User,
  Post,
  Tag,
  Comment,
  MediaTag,
  TagEvaluation,
} from '@prisma/client/'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { MutationCreateMediaArgs } from '../../__generated__/schema'
import {
  S3_BUCKET,
  S3_REGION,
  S3_ACCESS_KEY_ID,
  S3_SECRET_ACCESS_KEY,
} from '../../../constants/index.js'
const prisma = new PrismaClient()

const createMedia = async (
  _: any,
  {
    userUuid,
    file,
    filename,
    contentType,
    width,
    height,
    ratio,
  }: MutationCreateMediaArgs
): Promise<Post> => {
  // get s3 key and bucket from env
  // バケット名とアップロードする画像のキーを設定
  // S3にファイルをアップロードする
  const s3Key = `${uuidv4()}/${filename}`

  // S3クライアントを作成
  const s3Client = new S3Client({
    region: S3_REGION,
    credentials: {
      accessKeyId: S3_ACCESS_KEY_ID,
      secretAccessKey: S3_SECRET_ACCESS_KEY,
    },
  })

  // 画像をアップロードする関数
  async function uploadImage(bucket, key, data) {
    const { createReadStream, filename } = await file
    const fileStream = createReadStream()
    const fileBuffer = await new Promise((resolve, reject) => {
      const chunks = []
      fileStream.on('data', (chunk) => chunks.push(chunk))
      fileStream.on('error', reject)
      fileStream.on('end', () => resolve(Buffer.concat(chunks)))
    })

    const uploadParams = {
      Bucket: bucket,
      Key: key,
      Body: fileBuffer,
      ContentType: contentType, // 画像の形式に応じて変更
    }

    try {
      const result = await s3Client.send(new PutObjectCommand(uploadParams))
      console.log('画像がアップロードされました:', result)
    } catch (error) {
      console.error('画像のアップロードに失敗しました:', error)
    }
  }

  // uploadImage(S3_BUCKET, s3Key, file)

  return prisma.post.create({
    data: {
      userUuid,
      media: {
        create: [
          { filename, width, height, ratio, s3Key, s3Bucket: S3_BUCKET },
        ],
      },
    },
    include: { media: true },
  })
}

export default createMedia
