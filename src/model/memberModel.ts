import { Snowflake } from '@theinternetfolks/snowflake'
import * as mongoose from 'mongoose'

interface SavedMemberDocument extends mongoose.Document {
    id: string,
    community: string,
    user: string,
    role: string,
    created_at: Date
}

const memberSchema = new mongoose.Schema({
    id: {
        type: String,
        default: Snowflake.generate()
    },

    community: String,
    
    user: {
        type: String,
        ref: 'User'
    },

    role: {
        type: String,
        ref: 'Role'
    },

    created_at: {
        type: Date,
        default: Date.now()
    },
    __v: { type: Number, select: false },
}, {
    toJSON: {
        transform: function (doc, ret) {
            ret._id;
            delete ret._id;
        }
    }
})


const Member = mongoose.model<SavedMemberDocument>('Member', memberSchema)

export { Member }