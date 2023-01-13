process.env.NODE_ENV = 'test'
import db from '#database/db'
import createServer from '#src/app'
import {
  invalidDeposit,
  invalidTransfer400,
  invalidTransfer404,
  invalidWithdrawal,
  validDeposit,
  validLogin,
  validTransfer,
  validWithdrawal
} from '#utils/payloads'
import { assert } from 'chai'
import supertest from 'supertest'

const app = createServer()
let token: string
const user = db
  .select('id', 'email', 'balance')
  .from('users')
  .where('email', '=', `${validLogin.email}`)
  .first()

describe('Transactions', () => {
  beforeEach((done) => {
    supertest(app)
      .post('/api/v1/login')
      .send(validLogin)
      .then((response) => {
        token = response.body.token
        done()
      })
  })

  describe('POST /api/v1/deposit', () => {
    describe('When all required fields are filled and amount is valid', () => {
      it('should process the deposit successfully and return status code 201', (done) => {
        supertest(app)
          .post('/api/v1/deposit')
          .set('Authorization', `Bearer ${token}`)
          .send(validDeposit)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .then((response) => {
            assert(response.body.amount, (+validDeposit.amount).toLocaleString())
            assert(response.body.message, 'deposit successful')
            assert(response.body.balance, (+validDeposit.amount + +user.balance).toLocaleString())
            done()
          })
      })
    })

    describe('When a required field is missing or an amount is invalid', () => {
      it('should fail and return status code 400', (done) => {
        supertest(app)
          .post('/api/v1/deposit')
          .set('Authorization', `Bearer ${token}`)
          .send(invalidDeposit)
          .expect(400, done)
      })
    })
  })

  describe('POST /api/v1/transfer', () => {
    describe('When all required fields are filled with a valid amount and recipient', () => {
      it('should process the transfer successfully and return status code 201', (done) => {
        supertest(app)
          .post('/api/v1/transfer')
          .send(validTransfer)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .then((response) => {
            assert(response.body.amount, (+validTransfer.amount).toLocaleString())
            assert(response.body.message, 'transfer successful')
            assert(response.body.recipient, `${validTransfer.recipient}`)
            assert(response.body.balance, (+user.balance - +validTransfer.amount).toLocaleString())
            done()
          })
      })
    })

    describe('When a required field is missing/amount is not valid/self-transfer/insufficient funds', () => {
      it('should fail and return a 400', (done) => {
        supertest(app)
          .post('/api/v1/transfer')
          .send(invalidTransfer400)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect(400, done)
      })
    })

    describe('When sender/recipient does not exist', () => {
      it('should fail and return a 404', (done) => {
        supertest(app)
          .post('/api/v1/transfer')
          .send(invalidTransfer404)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect(404, done)
      })
    })
  })

  describe('POST /api/v1/withdrawal', () => {
    describe('When all required fields are filled with a valid amount and account number', () => {
      it('should process the withdrawal successfully and return status code 201', (done) => {
        supertest(app)
          .post('/api/v1/withdrawal')
          .send(validWithdrawal)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(201)
          .then((response) => {
            assert(response.body.amount, (+validWithdrawal.amount).toLocaleString())
            assert(response.body.message, 'withdrawal successful')
            assert(response.body.recipient, `${validWithdrawal.recipient}`)
            assert(
              response.body.balance,
              (+user.balance - +validWithdrawal.amount).toLocaleString()
            )
            done()
          })
      })
    })

    describe('When a required field is missing/amount or account number is not valid/insufficient funds', () => {
      it('should fail and return a 400', (done) => {
        supertest(app)
          .post('/api/v1/withdrawal')
          .send(invalidWithdrawal)
          .set('Authorization', `Bearer ${token}`)
          .set('Accept', 'application/json')
          .expect(400, done)
      })
    })
  })
})
