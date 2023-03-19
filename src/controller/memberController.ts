import { Request, Response, NextFunction } from "express";
import { CustomError } from "./../utils/customError";
import { Member } from "./../model/memberModel";


const addMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {community, user, role} = req.body

        if(!community || !user || !role) {
            return next(new CustomError('Invalid details.', 403))
        }
    
        const newMember = await Member.create({
            community: community,
            user: user,
            role: role
        })

        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newMember.id,
                    community: community,
                    user: user,
                    role: role,
                    created_at: newMember.created_at
                }
            }
        })
    } catch (err) {
        return next(err)
    }
}

export { addMember }