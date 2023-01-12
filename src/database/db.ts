import config from '#database/knexfile'
import 'dotenv/config'
import knex from 'knex'

let db: any

/* NOTE TO SELF: In prod, use dependency injection to create knex instance
so db access can be mocked for tests */

if (process.env.NODE_ENV === 'development') {
  db = knex(config.development)
} else if (process.env.NODE_ENV === 'production') {
  db = knex(config.production)
} else if (process.env.NODE_ENV === 'test') {
  db = knex(config.test)
}

export default db
