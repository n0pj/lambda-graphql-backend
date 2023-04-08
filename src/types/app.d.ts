import { BaseContext } from '@apollo/server'
export interface JwtUser {
  uuid: string
}

export interface Context extends BaseContext {
  user?: JwtUser
}
