import authController from '#controllers/auth.controller'
import checkAuth from '#middleware/checkAuth'
import { Router } from 'express'
import asyncHandler from 'express-async-handler'

const authRouter = Router()

authRouter.post('/register', asyncHandler(authController.register))
authRouter.post('/login', asyncHandler(authController.login))
authRouter.post('/logout', checkAuth, asyncHandler(authController.logout))
authRouter.get('/user', checkAuth, asyncHandler(authController.authUser))

export default authRouter
