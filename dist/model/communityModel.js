"use strict";
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
exports.Community = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const snowflake_1 = require("@theinternetfolks/snowflake");
const slugify_1 = __importDefault(require("slugify"));
const communitySchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        default: snowflake_1.Snowflake.generate()
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
        transform: function (doc, ret) {
            ret._id;
            delete ret._id;
        }
    }
});
communitySchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.slug = (0, slugify_1.default)(this.name);
        next();
    });
});
const Community = mongoose_1.default.model('Community', communitySchema);
exports.Community = Community;
//# sourceMappingURL=communityModel.js.map