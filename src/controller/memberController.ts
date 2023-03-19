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
            community,
            user,
            role
        })

        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newMember.id,
                    community,
                    user,
                    role,
                    created_at: newMember.created_at
                }
            }
        })
    } catch (err) {
        return next(err)
    }
}

const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await Member.findOneAndRemove({
            id: req.params.id,
        })
        res.status(200).json({
            status: true
        })
    } catch (err) {
        return next(err)
    }
}

export { addMember, deleteMember }