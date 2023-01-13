import 'dotenv/config'
import type { Knex } from 'knex'

interface IKnexConfig {
  [key: string]: Knex.Config
}

const config: IKnexConfig = {
  development: {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_URI_DEV,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_URI_PROD,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: process.env.DB_CLIENT,
    connection: process.env.DB_URI_TEST,
    pool: {
      min: 0,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

export default config
