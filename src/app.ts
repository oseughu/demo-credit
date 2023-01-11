import errorHandler from '#middleware/error'
import routes from '#routes'
import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import swaggerUi from 'swagger-ui-express'
// @ts-ignore
import * as swaggerDoc from '../swagger.json'

const port = process.env.PORT

const createServer = () => {
  const app: Express = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use(errorHandler)
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
