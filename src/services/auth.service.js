import db from '#database/db'
import bcrypt from 'bcryptjs'

export default class authService {
  static async register(firstName, lastName, email, password) {
    const alreadyExists = await db.select('email').from('users').where({ email })

    if (alreadyExists.length !== 0) {
      throw new Error('user already exists. please login.')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const newUser = await db('users').insert({
      email,
      first_name: firstName,
      last_name: lastName,
      password: hash
    })

    return newUser
  }

  static async login(email, password) {
    const user = await db.select('id', 'email', 'password').from('users').where({ email }).first()

    if (!user) {
      throw new Error('user not found. please create an account')
    }

    const checkPassword = await bcrypt.compare(password, user.password)

    if (!checkPassword) {
      throw new Error('invalid credentials.')
    }

    return user
  }
}
