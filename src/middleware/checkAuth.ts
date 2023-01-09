import db from '#database/db'
import { IGetUserAuthInfoRequest } from '#utils/interface'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'

const checkAuth = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {
    //@ts-ignore
    const cookie = req.session.jwt
    const claims: any = jwt.verify(cookie, process.env.SECRET)

    req.user = await db
      .select('id', 'email', 'balance')
      .from('users')
      .where({ id: claims.id })
      .first()

    next()
  } catch (err) {
    console.log(err)
    res.status(401).send({ error: 'not logged in.' })
  }
}

export default checkAuth
