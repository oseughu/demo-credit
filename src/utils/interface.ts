import { Request } from 'express'

export interface IGetUserAuthInfoRequest extends Request {
  user: any
}

export interface IUser {
  id: string
  first_name: string
  last_name: string
  email: string
  balance: number
  password: string
}
