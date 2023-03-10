import db from '#database/db'
import { IGetUserAuthInfoRequest } from '#utils/interface'
import { NextFunction, Response } from 'express'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

const checkAuth = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    //@ts-ignore
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : ''

    if (token === '') {
      res.status(401)
      throw new Error('not logged in.')
    }

    const claims: any = jwt.verify(token, process.env.SECRET)

    req.user = await db
      .select('id', 'first_name', 'last_name', 'email', 'balance')
      .from('users')
      .where('id', '=', `${claims.id}`)
      .first()

    next()
  }
)

export default checkAuth
