import yup from 'yup'

/**
 *
 * パスワード要件
 *
 * - 少なくとも 1 つの数字を含む
 * - 少なくとも 1 つの特殊文字を含む
 * - 少なくとも 1 つの大文字を含む
 * - 少なくとも 1 つの小文字を含む
 * - 空白を含まない
 * - 全角文字を含まない
 * - 8 文字以上
 */
export const passwordSchema = yup
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .matches(/[0-9]/, 'Password must contain at least 1 number.')
  .matches(
    /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
    'Password must contain at least 1 special character.'
  )
  .matches(/[A-Z]/, 'Password must contain at least 1 uppercase letter.')
  .matches(/[a-z]/, 'Password must contain at least 1 lowercase letter.')
  .matches(/^[^\s]*$/, 'Password cannot contain spaces.')
  .matches(
    /^[^\uFF01-\uFFFF]*$/,
    'Password cannot contain full-width characters.'
  )
