import express from 'express'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

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