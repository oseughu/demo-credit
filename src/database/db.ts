import knex from 'knex'
import config from './knexfile'

/* NOTE TO SELF: In prod, use dependency injection to create knex instance
so db access can be mocked for tests */

const db =
  process.env.NODE_ENV === 'development' ? knex(config.development) : knex(config.production)

export default db
