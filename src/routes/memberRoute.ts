import { Router } from "express"
import { addMember } from "./../controller/memberController"

const memberRouter: Router = Router()

memberRouter.route('/').post(addMember)

export {memberRouter}