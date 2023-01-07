import routes from '#routes'
import cors from 'cors'
import 'dotenv/config'
import express, { Application, json, Request, Response, urlencoded } from 'express'
import session from 'express-session'

declare module 'express-session' {
  export interface SessionData {
    jwt: string
  }
}

const app: Application = express()
const port = process.env.PORT

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 24 * 60 * 60 * 100,
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'development' ? false : true
    }
  })
)

app.use(urlencoded({ extended: true }))
app.use(json())
app.use(cors())
app.use(routes)

app.get('/', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to the Demo Credit API!' })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}.`)
})
