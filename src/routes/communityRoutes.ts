import { Router } from "express"
import {
    createCommunity, getAllCommunities, getAllMembers, getMyOwnedCommunities,
    getMyJoinedCommunities
} from "./../controller/communityController"

const communityRouter: Router = Router()

communityRouter.route('/').post(createCommunity).get(getAllCommunities)
communityRouter.route('/:id/members').get(getAllMembers)
communityRouter.route('/me/owner').get(getMyOwnedCommunities)
communityRouter.route('/me/member').get(getMyJoinedCommunities)

export { communityRouter }