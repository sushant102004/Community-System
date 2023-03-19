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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose = __importStar(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const snowflake_1 = require("@theinternetfolks/snowflake");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        maxLength: 128,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator(value) {
                return validator_1.default.isEmail(value);
            }
        }
    },
    password: {
        type: String,
        maxLength: 64,
        required: true,
        trim: true,
        validate: {
            validator(value) {
                return validator_1.default.isAlphanumeric(value);
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
        transform: function (doc, ret) {
            ret._id;
            delete ret._id;
        }
    }
});
exports.userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password'))
            return next();
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        this.email = this.email.toLocaleLowerCase();
        next();
    });
});
const User = mongoose.model('User', exports.userSchema);
exports.User = User;
//# sourceMappingURL=userModel.js.map