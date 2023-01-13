import transactionController from '#controllers/transaction.controller'
import checkAuth from '#middleware/checkAuth'
import { Router } from 'express'
import asyncHandler from 'express-async-handler'

const transactionRouter = Router()

transactionRouter.post('/deposit', checkAuth, asyncHandler(transactionController.deposit))
transactionRouter.post('/transfer', checkAuth, asyncHandler(transactionController.transfer))
transactionRouter.post('/withdrawal', checkAuth, asyncHandler(transactionController.withdrawal))

export default transactionRouter
