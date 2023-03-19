"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.roleSchema = void 0;
const mongoose = __importStar(require("mongoose"));
const snowflake_1 = require("@theinternetfolks/snowflake");
exports.roleSchema = new mongoose.Schema({
    id: {
        type: String,
        default: snowflake_1.Snowflake.generate()
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
        transform(doc, ret) {
            ret._id;
            delete ret._id;
        }
    }
});
const Role = mongoose.model('Role', exports.roleSchema);
exports.Role = Role;
//# sourceMappingURL=roleModel.js.map