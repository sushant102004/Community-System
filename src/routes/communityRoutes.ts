import { Router } from "express"
import { createCommunity, getAllCommunities } from "./../controller/communityController"

const communityRouter: Router = Router()

communityRouter.route('/').post(createCommunity).get(getAllCommunities)

export {communityRouter}