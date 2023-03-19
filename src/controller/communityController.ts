import { User } from './../model/userModel'
import { Request, Response, NextFunction } from "express"
import { CustomError } from './../utils/customError'
import { Community } from './../model/communityModel'
import { verify } from 'jsonwebtoken'


const createCommunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {name} = req.body
        if(!name) {
            return next(new CustomError('Provide community name.', 403))
        }

        const newCommunity = await Community.create({ 
            name : name,
            owner: 7043095415236738000
         })

         res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newCommunity.id,
                    name: newCommunity.name,
                    slug: newCommunity.slug,
                    owner: newCommunity.owner,
                    created_at: newCommunity.created_at,
                    updated_at: newCommunity.updated_at
                }
            }
        })
    } catch (err) {
        return next(err)
    }
}

export {createCommunity}