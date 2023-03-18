import { Router } from "express"
import { createAccount } from './../controller/authController'

const authRouter: Router = Router()

authRouter.route('/signup').post(createAccount)

export {authRouter}