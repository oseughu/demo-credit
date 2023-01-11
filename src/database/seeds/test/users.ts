import bcrypt from 'bcryptjs'
import 'dotenv/config'
import { Knex } from 'knex'

const hash = bcrypt.hashSync(process.env.USER_PASSWORD, 10)

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { first_name: 'James', last_name: 'Bond', email: '007@gmail.com', password: hash }
  ])
}
