import config from '#database/knexfile'
import 'dotenv/config'
import knex from 'knex'

let db: any

/* NOTE TO SELF: In prod, use dependency injection to create knex instance
so db access can be mocked for tests */

switch (process.env.NODE_ENV) {
  case 'development':
    db = knex(config.development)
    break
  case 'production':
    db = knex(config.production)
    break
  case 'test':
    db = knex(config.test)
    break
  default:
    db = knex(config.development)
}

export default db
