import { Router } from "express"
import { createAccount, signIn, getMe } from './../controller/authController'

const authRouter: Router = Router()

authRouter.route('/signup').post(createAccount)
authRouter.route('/signin').post(signIn)
authRouter.route('/me').get(getMe)


export {authRouter}