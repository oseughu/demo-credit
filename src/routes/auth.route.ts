import authController from '#controllers/auth.controller'
import checkAuth from '#middleware/checkAuth'
import { Router } from 'express'

const authRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/logout', authController.logout)
authRouter.get('/user', checkAuth, authController.authUser)

export default authRouter
