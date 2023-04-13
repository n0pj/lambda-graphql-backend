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
import signUp from './signUp.js'
import resendConfirmationCode from './resendConfirmationCode.js'
import confirmSignUp from './confirmSignUp.js'
import changeEmail from './changeEmail.js'
import changeUserDetail from './changeUserDetail.js'
import verifyEmail from './verifyEmail.js'
import resetPassword from './resetPassword.js'
import confirmResetPassword from './confirmResetPassword.js'
import changePassword from './changePassword.js'
import signIn from './signIn.js'
import signOut from './signOut.js'

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
  resendConfirmationCode,
  confirmSignUp,
  changeEmail,
  changeUserDetail,
  confirmResetPassword,
  verifyEmail,
  resetPassword,
  changePassword,
  signIn,
  signOut,
}

export default Mutation
