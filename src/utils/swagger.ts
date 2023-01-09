import 'dotenv/config'
import { Application, Request, Response } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Demo Credit API',
      version: '1.0.0',
      description: 'This is an API built for a demo credit wallet',
      contact: {
        name: 'Ose Ughu',
        url: 'https://oseughu.com',
        email: 'oseughu@email.com'
      }
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'development'
            ? 'http://localhost:3005'
            : 'https://ose-ughu-lendsqr-be-test.cyclic.app/'
      }
    ]
  },
  apis: ['../routes/*.route.ts']
}

const specs = swaggerJsdoc(options)

function swaggerDocs(app: Application, port: number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }))

  app.get('docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(specs)
  })
}

export default swaggerDocs
