import mongoose from 'mongoose'
import { Snowflake } from '@theinternetfolks/snowflake'
import slugify from 'slugify'

interface SavedCommunityModel extends mongoose.Document {
    id: string,
    name: string,
    slug: string,
    owner: string,
    created_at: Date,
    updated_at: Date
}

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
        ref: 'User',
        required: true,
    },

    created_at: {
        type: Date,
        default: Date.now()
    },

    updated_at: {
        type: Date,
        default: Date.now()
    },
    __v: { type: Number, select: false },
    // _id: { type: mongoose.Schema.Types.ObjectId, select: false},
}, {
    toJSON: {
        transform(doc, ret) {
            ret._id
            delete ret._id
        }
    }
})

communitySchema.pre('save', async function (next) {
    this.slug = slugify(this.name)
    next()
})

const Community = mongoose.model<SavedCommunityModel>('Community', communitySchema)

export { Community, SavedCommunityModel }