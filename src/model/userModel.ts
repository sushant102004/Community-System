import * as mongoose from 'mongoose'
import validator from 'validator'
import { Snowflake } from '@theinternetfolks/snowflake'
import bcrypt from 'bcryptjs'

interface SavedUserDocument extends mongoose.Document {
    id: string,
    name: string,
    email: string,
    password: string,
    created_at: Date
}

export const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: Snowflake.generate()
    },

    name: {
        type: String,
        maxLength: 64,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        maxLength: 128,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator(value: string): boolean {
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
            validator(value: string): boolean {
                return validator.isAlphanumeric(value)
            }
        },
        select: false,
    },

    created_at: {
        type: Date,
        default: Date.now()
    },
    __v: { type: Number, select: false },
    // _id: { type: mongoose.Schema.Types.ObjectId, select: false},
}, {
    toJSON: {
        transform (doc, ret) {
            ret._id;
            delete ret._id;
        }
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 12)
    this.email = this.email.toLocaleLowerCase()
    next()
})

const User = mongoose.model<SavedUserDocument>('User', userSchema)

export { User, SavedUserDocument }