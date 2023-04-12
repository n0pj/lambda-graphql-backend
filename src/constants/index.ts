export enum ERROR {
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
}

export const ENV = process.env.ENV

export const AWS_REGION = process.env.AWS_REGION

export const COGNITO_CLIENT_ID = process.env.COGNITO_CLIENT_ID
export const COGNITO_CLIENT_SECRET = process.env.COGNITO_CLIENT_SECRET
export const COGNITO_USER_POOL_ID = process.env.COGNITO_USER_POOL_ID

export const S3_BUCKET = process.env.S3_BUCKET
export const S3_REGION = process.env.S3_REGION
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY
