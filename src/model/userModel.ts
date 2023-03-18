import mongoose from 'mongoose'
import validator from 'validator'
import { Snowflake } from '@theinternetfolks/snowflake'

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
            validator: function(value : string) : boolean {
                return validator.isAlpha(value)
            }
        }
    },

    email: {
        type: String,
        maxLength: 128,
        required: true,
        trim: true,
        validate: {
            validator: function(value : string) : boolean {
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
            validator: function(value : string) : boolean {
                return validator.isAlphanumeric(value)
            }
        }
    },

    created_at: {
        type: Date,
        default: Date.now()
    }
})