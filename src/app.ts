import express, { NextFunction } from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { Request, Response } from 'express'
import { CustomError } from './utils/customError'
import errorController from './controller/errorController'

import { authRouter } from './routes/authRoutes'
import { communityRouter } from './routes/communityRoutes'

dotenv.config()

const app = express()
const PORT: number = 3000

app.use(express.json())

mongoose.set('strictQuery', false)

mongoose.connect('mongodb://root:root1234@127.0.0.1:27017/theInternetFolks?authSource=admin')
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

app.use('/v1/auth', authRouter)
app.use('/v1/community', communityRouter)

app.get('*', (req: Request, res : Response, next: NextFunction) => {
    next(new CustomError(`The Route ${req.originalUrl} is not defined`, 400))
})


app.use(errorController)