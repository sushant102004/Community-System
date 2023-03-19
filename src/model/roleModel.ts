import * as mongoose from 'mongoose'
import { Snowflake } from '@theinternetfolks/snowflake'

interface SavedRoleDocument extends mongoose.Document {
    id: string,
    name: string,
    scopes: string[],
    created_at: Date,
    updated_at: Date
}

export const roleSchema = new mongoose.Schema({
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
    scopes: {
        type: Array,
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
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
})


const Role = mongoose.model<SavedRoleDocument>('Role', roleSchema)

export { Role, SavedRoleDocument }