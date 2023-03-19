import mongoose from 'mongoose'
import validator from 'validator'
import { Snowflake } from '@theinternetfolks/snowflake'

const communitySchema = new mongoose.Schema({
    id: {
        type: String,
        default: Snowflake.generate()
    },

    name: {
        type: String,
        maxLength: 128,
        required: true,
        trim: true,
        validate: {
            validator(value : string) : boolean {
                return validator.isAlpha(value)
            }
        }
    },

    owner: {
        type: String,
        ref: 'User'
    },

    created_at: {
        type: Date,
        default: Date.now()
    },

    updated_at: {
        type: Date,
        default: Date.now()
    },
})


const Community = mongoose.model('Community', communitySchema)

export { Community }