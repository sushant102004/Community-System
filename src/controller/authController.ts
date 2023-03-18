import {sign} from 'jsonwebtoken'
import { User } from './../model/userModel'
import { Request, Response, NextFunction } from "express"
import { CustomError } from './../utils/customError'


const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body

        if(!name || !email || !password) {
            return next(new CustomError('Please enter details.', '404'))
        }

        const newUser = await User.create({
            name,
            email,
            password
        })

        const accessToken = sign({id: newUser.id}, 'JWT_Secret')

        res.status(200).json({
            status: true,
            content: {
                data: {
                    id : newUser.id,
                    name : newUser.name,
                    email : newUser.email,
                    created_at : newUser.created_at
                },
                meta: {
                    access_token: accessToken
                }
            }
        })
    } catch (err) {
        return next(err)
    }
}

export {createAccount}