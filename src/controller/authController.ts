import { sign, verify } from 'jsonwebtoken'
import { User, SavedUserDocument } from './../model/userModel'
import { Request, Response, NextFunction } from "express"
import { CustomError } from './../utils/customError'
import bcrypt from 'bcryptjs'
import { getUserFromAuthToken } from './../utils/getUserFromToken'


const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
            return next(new CustomError('Please enter details.', 404))
        }

        const newUser = await User.create({ name, email, password })

        const accessToken = sign({ id: newUser.id }, 'JWT_Secret')

        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    created_at: newUser.created_at
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

const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new CustomError('Please enter details.', 404))
        }
        let user = await User.findOne({ email: email }).select('+password')
        if (!user) {
            return next(new CustomError('Account not found.', 404))
        }

        if (!await bcrypt.compare(password, user.password)) {
            return next(new CustomError('Email or Password invalid.', 401))
        }

        const accessToken = sign({ id: user.id }, 'JWT_Secret')

        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
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

const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getUserFromAuthToken(req, res, next).then((user : SavedUserDocument) => {
            res.status(200).json({
                status: true,
                content: {
                    data: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at,
                    }
                }
            })
        })
    } catch (err) {
        return next(err)
    }
}

export { createAccount, signIn, getMe }