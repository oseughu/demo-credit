import 'dotenv/config'
import type { Knex } from 'knex'

interface IKnexConfig {
  [key: string]: Knex.Config
}

const config: IKnexConfig = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST_DEV,
      port: +process.env.DB_PORT,
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASSWORD_DEV,
      database: process.env.DB_NAME_DEV
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST_PROD,
      port: +process.env.DB_PORT,
      user: process.env.DB_USER_PROD,
      password: process.env.DB_PASSWORD_PROD,
      database: process.env.DB_NAME_PROD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  test: {
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST_TEST,
      port: +process.env.DB_PORT,
      user: process.env.DB_USER_TEST,
      password: process.env.DB_PASSWORD_TEST,
      database: process.env.DB_NAME_TEST
    },
    pool: {
      min: 2,
      max: 10
    },
    seeds: {
      directory: './seeds/test'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

export default config
