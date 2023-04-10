import { PrismaClient } from '@prisma/client/index.js'

import user from './user.js'
import posts from './posts.js'
import tags from './tags.js'
import comments from './comments.js'
import media from './media.js'

const prisma = new PrismaClient()

/**
 * Query resolvers
 */
const Query = {
  user,
  posts,
  tags,
  comments,
  media,
}

export default Query
