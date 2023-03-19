import { Router } from "express"
import { createNewRole, getAllRoles } from "./../controller/rolesController"

const roleRouter: Router = Router()

roleRouter.route('/').post(createNewRole).get(getAllRoles)

export {roleRouter}