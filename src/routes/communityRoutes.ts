import { Router } from "express"
import { createCommunity } from "./../controller/communityController"

const communityRouter: Router = Router()

communityRouter.route('/').post(createCommunity)

export {communityRouter}