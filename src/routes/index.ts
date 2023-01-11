import authRouter from '#routes/auth.route'
import transactionRouter from '#routes/transaction.route'
import { Router } from 'express'

const routes = Router()

routes.use(authRouter, transactionRouter)

export default routes
