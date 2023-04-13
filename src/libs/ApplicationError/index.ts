import { GraphQLError } from 'graphql'
import { ErrorCode } from './constatants/error.js'

// ReExport
export { ErrorCode }

class ApplicationError extends GraphQLError {
  public code: ErrorCode
  public errors: any[]

  constructor(message: string, code: ErrorCode, errors: any[] = []) {
    super(message, {
      extensions: {
        code,
        errors,
      },
    })
  }
}

export default ApplicationError
