import db from '#database/db'
import bcrypt from 'bcryptjs'

export default class authService {
  static async register(firstName: string, lastName: string, email: string, password: string) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    await db('users').insert({
      email,
      first_name: firstName,
      last_name: lastName,
      password: hash
    })
  }

  static async login(email: string, password: string) {
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
