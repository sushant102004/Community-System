import { Router } from "express"
import { addMember, deleteMember } from "./../controller/memberController"

const memberRouter: Router = Router()

memberRouter.route('/').post(addMember)
memberRouter.route('/:id').delete(deleteMember)

export {memberRouter}