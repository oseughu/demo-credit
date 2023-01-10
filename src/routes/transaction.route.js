import transactionController from '#controllers/transaction.controller'
import checkAuth from '#middleware/checkAuth'
import { Router } from 'express'

const transactionRouter = Router()

transactionRouter.post('/deposit', checkAuth, transactionController.deposit)
transactionRouter.post('/transfer', checkAuth, transactionController.transfer)
transactionRouter.post('/withdrawal', checkAuth, transactionController.withdrawal)
transactionRouter.get('/transactions', checkAuth, transactionController.userTransactions)
transactionRouter.get(
  '/transactions/:transactionId',
  checkAuth,
  transactionController.singleUserTransaction
)

export default transactionRouter
