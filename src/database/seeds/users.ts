import bcrypt from 'bcryptjs'
import { Knex } from 'knex'

const hash = bcrypt.hashSync('test12345', 10)

export async function seed(knex: Knex): Promise<void> {
  // Deletes existing entries of seed
  await knex('transactions').del()
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { first_name: 'James', last_name: 'Bond', email: '007@gmail.com', password: hash }
  ])
}
