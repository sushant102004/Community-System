import {CustomError} from './../utils/customError'
import { Request, Response } from 'express'

export default (err: CustomError, req: Request, res: Response, next: any) => {
    err.status = err.status || false
    err.statusCode = err.statusCode || '500'

    res.status(parseInt(err.statusCode)).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack
    })
}