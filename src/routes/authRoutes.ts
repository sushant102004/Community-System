import { Router } from "express"
import { createAccount, signIn, } from './../controller/authController'

const authRouter: Router = Router()

authRouter.route('/signup').post(createAccount)
authRouter.route('/signin').post(signIn)

export {authRouter}