import { PrismaClient } from '@prisma/client/index.js'

import createUser from './createUser.js'
import createPost from './createPost.js'
import createMedia from './createMedia.js'
import createTag from './createTag.js'
import createComment from './createComment.js'
import addTagToMedia from './addTagToMedia.js'
import addEvaluationToTag from './addEvaluationToTag.js'
import addEvaluationToMedia from './addEvaluationToMedia.js'
import addActionToMedia from './addActionToMedia.js'
import addActionToComment from './addActionToComment.js'
import addMediaToFavorites from './addMediaToFavorite.js'
import removeMediaFromFavorites from './removeMediaFromFavorites.js'
import addCommentToMedia from './addCommentToMedia.js'
import addCommentToComment from './addCommentToComment.js'
import signIn from './signIn.js'
import signUp from './signUp.js'
import signOut from './signOut.js'

const prisma = new PrismaClient()

/**
 * Mutation resolvers
 */
const Mutation = {
  createUser,
  createPost,
  createMedia,
  createTag,
  createComment,
  addTagToMedia,
  addEvaluationToTag,
  addEvaluationToMedia,
  addActionToMedia,
  addActionToComment,
  addMediaToFavorites,
  removeMediaFromFavorites,
  addCommentToMedia,
  addCommentToComment,
  signUp,
  signIn,
  signOut,
}

export default Mutation
