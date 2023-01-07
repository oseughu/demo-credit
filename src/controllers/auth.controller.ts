import db from '#database/db'
import authService from '#services/auth.service'
import { IGetUserAuthInfoRequest } from '#utils/interface'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default class authController {
  static async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, confirmPassword } = req.body
      const alreadyExists = await db.select().from('users').where({ email: email.toLowerCase() })

      if (password !== confirmPassword) {
        throw new Error('passwords do not match')
      }

      if (alreadyExists.length !== 0) {
        throw new Error('user already exists. please login.')
      }

      authService.register(firstName, lastName, email, password)

      res.status(201).send({ status: 'ok', message: 'user created successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Something went wrong' })
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const user = await authService.login(email, password)

      const token = jwt.sign({ id: user.id }, process.env.SECRET)

      req.session.jwt = token

      res.send({ status: 'ok', message: 'logged in successfully' })
    } catch (err) {
      console.error(err)
      res.status(500).send({ error: 'Something went wrong' })
    }
  }

  static authUser(req: IGetUserAuthInfoRequest, res: Response) {
    res.send(req.user)
  }

  static logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err)
        res.status(500).send({ error: 'Something went wrong' })
      } else {
        res.send({ message: 'logged out successfully' })
      }
    })
  }
}
