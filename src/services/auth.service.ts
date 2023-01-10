import db from '#database/db'
import bcrypt from 'bcryptjs'

export default class authService {
  static async register(firstName: string, lastName: string, email: string, password: string) {
    const alreadyExists = await db.select('email').from('users').where('email', '=', `${email}`)

    if (alreadyExists.length !== 0) {
      throw new Error('user already exists. please login.')
    }

    const salt = await bcrypt.genSalt(10)

    await db('users').insert({
      email,
      first_name: firstName,
      last_name: lastName,
      password: await bcrypt.hash(password, salt)
    })
  }

  static async login(email: string, password: string) {
    const user = await db
      .select('email', 'password')
      .from('users')
      .where('email', '=', `${email}`)
      .first()

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
