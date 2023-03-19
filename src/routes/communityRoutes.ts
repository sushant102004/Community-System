import { Router } from "express"
import { createCommunity, getAllCommunities, getAllMembers } from "./../controller/communityController"

const communityRouter: Router = Router()

communityRouter.route('/').post(createCommunity).get(getAllCommunities)
communityRouter.route('/:id/members').get(getAllMembers)

export {communityRouter}