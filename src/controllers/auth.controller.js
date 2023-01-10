import authService from '#services/auth.service'
import jwt from 'jsonwebtoken'

export default class authController {
  static async register(req, res) {
    try {
      const { firstName, lastName, email, password, confirmPassword } = req.body

      if (password !== confirmPassword) {
        res.status(400).send({ error: 'passwords do not match' })
      }

      authService.register(firstName, lastName, email, password)

      res.status(201).send({ status: 'ok', message: 'user created successfully' })
    } catch (err) {
      console.error(err)
      res.status(400).send({ error: 'user already exists. please login' })
    }
  }

  static async login(req, res) {
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

  static authUser(req, res) {
    res.send({
      id: req.user.id,
      email: req.user.email,
      balance: (+req.user.balance).toLocaleString()
    })
  }

  static logout(req, res) {
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
