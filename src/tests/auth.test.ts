import db from '#database/db'
import createServer from '#src/app'
import payload from '#utils/payload'
import 'dotenv/config'
import supertest from 'supertest'

process.env.NODE_ENV = 'test'

// const app = createServer()
