import routes from '#routes'
import store from '#utils/knexStore'
import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../swagger.json' assert { type: 'json' }

const port = process.env.PORT

const createServer = () => {
  const app = express()

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
      store
    })
  )

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/api/v1', routes)
  app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  app.get('/', (req, res) => {
    res.send({ message: 'Welcome to the Demo Credit API!' })
  })

  return app
}

const app = createServer()

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})

export default createServer
