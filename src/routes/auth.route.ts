import authController from '#controllers/auth.controller'
import checkAuth from '#middleware/checkAuth'
import { Router } from 'express'

const authRouter = Router()

/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Sign Up
 *     description: Creates a user with 0.00 balance
 *     responses:
 *       200:
 *         description: App is up and running
 */
authRouter.post('/register', authController.register)
/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Sign Up
 *     description: Creates a user with 0.00 balance
 *     responses:
 *       200:
 *         description: App is up and running
 */
authRouter.post('/login', authController.login)
/**
 * @openapi
 * /register:
 *  post:
 *     tags:
 *     - Sign Up
 *     description: Creates a user with 0.00 balance
 *     responses:
 *       200:
 *         description: App is up and running
 */
authRouter.post('/logout', authController.logout)
/**
 * @openapi
 * /user:
 *  post:
 *     tags:
 *     - Sign Up
 *     description: Creates a user with 0.00 balance
 *     responses:
 *       200:
 *         description: App is up and running
 */
authRouter.get('/user', checkAuth, authController.authUser)

export default authRouter
