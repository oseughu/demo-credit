import config from '#database/knexfile'
import knex from 'knex'

/* NOTE TO SELF: In prod, use dependency injection to create knex instance
so db access can be mocked for tests */

const db = knex(config.production)

export default db
