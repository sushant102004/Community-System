import mongoose from 'mongoose'
import { Snowflake } from '@theinternetfolks/snowflake'
import slugify from 'slugify'

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
    },

    slug: String,

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

communitySchema.pre('save', async function(next) {
    this.slug = slugify(this.name)
    next()
})

const Community = mongoose.model('Community', communitySchema)

export { Community }