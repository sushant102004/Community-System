import express, { NextFunction } from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import { CustomError } from './utils/customError'
import errorController from './controller/errorController'

dotenv.config()

const app = express()
const PORT: number = 3000

app.use(express.json())

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://localhost:27017/theInternetFolks')
    .then(() => {
        app.listen(PORT)
        console.log(`Listening On PORT ${PORT}`)
    }).catch(err => console.log(`Error: ${err}`))


app.get('/', (req: Request, res : Response) => {
    res.status(200).json({
        status: true,
        message: 'This is home route.'
    })
})

app.get('*', (req: Request, res : Response, next: NextFunction) => {
    next(new CustomError(`The Route ${req.originalUrl} is not defined`, '400')) 
})


app.use(errorController)