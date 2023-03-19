import { SavedUserDocument, User } from './../model/userModel'
import { Request, Response, NextFunction } from "express"
import { CustomError } from './../utils/customError'
import { Community } from './../model/communityModel'
import { getUserFromAuthToken } from './../utils/getUserFromToken'
import { Member } from './../model/memberModel'



const createCommunity = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body
        if (!name) {
            return next(new CustomError('Provide community name.', 403))
        }

        let userID: string
        await getUserFromAuthToken(req, res, next).then(
            (user: SavedUserDocument) => userID = user.id
        )

        const newCommunity = await Community.create({
            name: name,
            owner: userID
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

const getAllCommunities = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const communities = await Community.find().populate({
            path: 'owner',
            model: 'User',
            select: 'name',
            foreignField: 'id'
        })

        res.status(200).json({
            status: true,
            meta: {
                total: communities.length,
                pages: Math.ceil(communities.length / 10),
            },
            data: communities
        })
    } catch (err) {
        return next(err)
    }
}

const getAllMembers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const communityID = req.params.id
        const members = await Member.find({
            community: communityID
        }).populate({
            path: 'user',
            model: 'User',
            select: 'name',
            foreignField: 'id'
        }).populate({
            path: 'role',
            model: 'Role',
            select: 'name',
            foreignField: 'id'
        })

        res.status(200).json({
            status: true,
            content : {
                meta : {
                    total: members.length,
                    pages: Math.ceil(members.length / 10),
                },
                data : members
            }
        })
    } catch(err) {
        return next(err)
    }
}

export { createCommunity, getAllCommunities, getAllMembers }