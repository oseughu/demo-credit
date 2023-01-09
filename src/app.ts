import db from '#database/db'
import routes from '#routes'
import cors from 'cors'
import 'dotenv/config'
import express, { Application, json, Request, Response, urlencoded } from 'express'
import session from 'express-session'
import MemoryStore from 'memorystore'
import swaggerUi from 'swagger-ui-express'
// @ts-ignore
import * as swaggerDoc from '../swagger.json'

declare module 'express-session' {
  export interface SessionData {
    jwt: string
  }
}

const port = +process.env.PORT

const createServer = () => {
  const app: Application = express()

  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.SECRET,
      cookie: {
        maxAge: 24 * 60 * 60 * 100,
        sameSite: 'none',
        secure: process.env.NODE_ENV === 'development' ? false : true
      },
      // @ts-ignore
      store: new MemoryStore({
        // @ts-ignore
        checkPeriod: 86400000 // prune expired entries every 24h
      })
    })
  )

  app.use(urlencoded({ extended: true }))
  app.use(json())
  app.use(cors())
  app.use('/api/v1', routes)
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'Welcome to the Demo Credit API!' })
  })

  return app
}

const app = createServer()

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})

export default createServer
