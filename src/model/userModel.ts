import mongoose, { Model } from 'mongoose'
import validator from 'validator'
import { Snowflake } from '@theinternetfolks/snowflake'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        default: Snowflake.generate()
    },

    name: {
        type: String,
        maxLength: 64,
        required: true,
        trim: true,
        validate: {
            validator(value : string) : boolean {
                return validator.isAlpha(value)
            }
        }
    },

    email: {
        type: String,
        maxLength: 128,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator(value : string) : boolean {
                return validator.isEmail(value)
            }
        }
    },

    password: {
        type: String,
        maxLength: 64,
        required: true,
        trim: true,
        validate: {
            validator(value : string) : boolean {
                return validator.isAlphanumeric(value)
            }
        },
        select: false,
    },

    created_at: {
        type: Date,
        default: Date.now()
    },
})

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.email = this.email.toLocaleLowerCase()
    next()
})

const User = mongoose.model('User', userSchema)

export { User }