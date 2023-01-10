import createServer from '#src/app'
import payload from '#utils/payload'
import supertest from 'supertest'
import config from '#database/knexfile'
import knex from 'knex'

const app = createServer()
const db = knex(config.test)

describe('authentication flow test', () => {
  beforeEach(function (done) {
    db.migrate.rollback().then(function () {
      db.migrate.latest().then(function () {
        return db.seed.run().then(function () {
          done()
        })
      })
    })
  })

  afterEach(function (done) {
    db.migrate.rollback().then(function () {
      done()
    })
  })

  // describe('POST /api/v1/register', () => {
  //   it('should create a user', function (done) {
  //     chai
  //       .request(app)
  //       .post('/api/v1/register')
  //       .send(payload.register())
  //       .end(function (err, res) {
  //         res.should.have.status(201)
  //         res.should.be.json
  //         res.body.should.have.property('status')
  //         // res.body[0].name.should.equal('Suits')
  //         res.body.should.have.property('message')
  //         // res.body[0].channel.should.equal('USA Network')
  //         done()
  //       })
  //   })
  // })

  describe('POST /api/v1/login', () => {
    it('should log in the user', function (done) {
      supertest(app)
        .post('/api/v1/login')
        .send({ email: '007@gmail.com', password: 'zinjee22' })
        .end(function (err, res) {
          // res.should.have.status(200)
          // res.should.be.json
          // res.body.should.have.property('status')
          // // res.body[0].name.should.equal('Suits')
          // res.body.should.have.property('message')
          // // res.body[0].channel.should.equal('USA Network')
          // done()
        })
    })
  })

  // describe('GET /api/v1/user', () => {
  //   it('should return the current logged in user', function (done) {
  //     chai
  //       .request(app)
  //       .get('/api/v1/user')
  //       .end(function (err, res) {
  //         res.should.have.status(200)
  //         res.should.be.json
  //         res.body.should.have.property('id')
  //         // res.body[0].name.should.equal('Suits')
  //         res.body.should.have.property('email')
  //         // res.body[0].channel.should.equal('USA Network')
  //         res.body.should.have.property('balance')
  //         // res.body.genre.should.equal('Drama')
  //         done()
  //       })
  //   })
  // })

  // describe('POST /api/v1/logout', () => {
  //   it('should return the current logged in user', function (done) {
  //     chai
  //       .request(app)
  //       .get('/api/v1/user')
  //       .end(function (err, res) {
  //         res.should.have.status(200)
  //         res.should.be.json
  //         res.body.should.have.property('id')
  //         // res.body[0].name.should.equal('Suits')
  //         res.body.should.have.property('email')
  //         // res.body[0].channel.should.equal('USA Network')
  //         res.body.should.have.property('balance')
  //         // res.body.genre.should.equal('Drama')
  //         done()
  //       })
  //   })
  // })
})
