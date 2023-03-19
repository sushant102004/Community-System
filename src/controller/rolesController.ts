import { Request, Response, NextFunction } from "express"
import { CustomError } from './../utils/customError'
import { Role } from "./../model/roleModel"
import { getUserFromAuthToken } from "./../utils/getUserFromToken"

const createNewRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        getUserFromAuthToken(req, res, next)

        const {name, scopes} = req.body
        if(!name) return next(new CustomError('Provide role name and scopes.', 403))

        const newRole = await Role.create({
            name: name,
            scopes: scopes
        })
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newRole.id,
                    name: newRole.name,
                    created_at: newRole.created_at,
                    updated_at: newRole.updated_at
                }
            }
        })
    } catch (err) {
        return next(err)
    }
}

    const getAllRoles = async (req: Request, res: Response, next: NextFunction) => {
        try {
            getUserFromAuthToken(req, res, next)
            const roles = await Role.find().populate('')

            res.status(200).json({
                status: true,
                meta: {
                    total: roles.length,
                    pages: Math.ceil(roles.length / 10),
                },
                data: roles
            })

        } catch (err) {
            return next(err)
        }
    }

export {createNewRole, getAllRoles}