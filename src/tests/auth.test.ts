process.env.NODE_ENV = 'test'
import db from '#database/db'
import createServer from '#src/app'
import { invalidLogin, invalidSignUp, validLogin, validSignUp } from '#utils/payloads'
import { assert } from 'chai'
import supertest from 'supertest'

const app = createServer()
let token: string

describe('Authentication', async () => {
  before((done) => {
    db.seed.run({ directory: './src/database/seeds' }).then(() => {
      done()
    })
  })

  describe('POST /api/v1/register', () => {
    describe('When all required fields are filled and passwords match', () => {
      it('should create a user and return status code 201', (done) => {
        supertest(app)
          .post('/api/v1/register')
          .send(validSignUp)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201, done)
      })
    })

    describe('When a required field is missing or passwords do not match', () => {
      it('should return status code 400', (done) => {
        supertest(app)
          .post('/api/v1/register')
          .send(invalidSignUp)
          .set('Accept', 'application/json')
          .expect(400, done)
      })
    })
  })

  describe('POST /api/v1/login', () => {
    describe('When user exists and credentials are correct', () => {
      it('should log a user in and return status code 200', (done) => {
        supertest(app)
          .post('/api/v1/login')
          .send(validLogin)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            assert(response.body.status, 'ok')
            assert(response.body.message, 'logged in successfully')
            done()
          })
      })
    })

    describe('When credentials are invalid or user does not exist', () => {
      it('should return a 401 unauthorized error', (done) => {
        supertest(app)
          .post('/api/v1/login')
          .send(invalidLogin)
          .set('Accept', 'application/json')
          .expect(401, done)
      })
    })
  })

  describe('GET /api/v1/user', () => {
    describe('When a user is currently logged in', () => {
      before((done) => {
        supertest(app)
          .post('/api/v1/login')
          .send(validLogin)
          .then((response) => {
            token = response.body.token
            done()
          })
      })

      it('should return the user and return status code 200', (done) => {
        supertest(app)
          .get('/api/v1/user')
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            assert(response.body.email, validLogin.email)
            done()
          })
      })
    })

    describe('When there is no user currently logged in', () => {
      it('should return a 401 unauthorized error', (done) => {
        supertest(app).get('/api/v1/user').expect(401, done)
      })
    })
  })

  describe('POST /api/v1/logout', () => {
    describe('When a user is currently logged in and wants to log out', () => {
      before((done) => {
        supertest(app)
          .post('/api/v1/login')
          .send(validLogin)
          .then((response) => {
            token = response.body.token
            done()
          })
      })

      it('should clear the authorization header and return status code 200', (done) => {
        supertest(app)
          .post('/api/v1/logout')
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done)
      })
    })

    describe('When there is no user currently logged in', () => {
      it('should return a 401 unauthorized error', (done) => {
        supertest(app).post('/api/v1/logout').expect(401, done)
      })
    })
  })
})
