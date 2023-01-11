import db from '#database/db'
import authService from '#services/auth.service'
import { IGetUserAuthInfoRequest } from '#utils/interface'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default class authController {
  static async register(req: Request, res: Response) {
    const { firstName, lastName, email, password, confirmPassword } = req.body
    const alreadyExists = await db.select('email').from('users').where('email', '=', `${email}`)

    if (alreadyExists.length !== 0) {
      res.status(400)
      throw new Error('User already exists.')
    }

    if (password !== confirmPassword) {
      res.status(400)
      throw new Error('passwords do not match')
    }

    await authService.register(firstName, lastName, email, password)

    res.status(201).send({ status: 'ok', message: 'user created successfully' })
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body

    const user = await authService.login(email, password)

    const token = jwt.sign({ id: user.id }, process.env.SECRET)

    //@ts-ignore
    req.session.jwt = token

    res.send({ status: 'ok', message: 'logged in successfully' })
  }

  static authUser(req: IGetUserAuthInfoRequest, res: Response) {
    res.send({
      id: req.user.id,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      balance: (+req.user.balance).toLocaleString()
    })
  }

  static logout(req: Request, res: Response) {
    //@ts-ignore
    req.session.destroy()
  }
}
