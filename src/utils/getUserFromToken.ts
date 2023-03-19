import { Request, Response, NextFunction } from "express"
import { CustomError } from "./customError"
import { verify } from "jsonwebtoken"
import { SavedUserDocument, User } from "./../model/userModel"

const getUserFromAuthToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        interface JwtPayload {
            id: number
        }

        let token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        } else {
            return next(new CustomError('You are not logged in. Authorization token not provided.', 401))
        }

        const decoded = verify(token, 'JWT_Secret') as JwtPayload
        const user : SavedUserDocument = await User.findOne({ id : decoded.id })

        if(!user) {
            return next(new CustomError('You are not logged in. Authorization token not provided.', 401))
        }

        return user
    } catch (err) {
        return next(err)
    }
}

export { getUserFromAuthToken }