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
exports.getMe = exports.signIn = exports.createAccount = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const userModel_1 = require("./../model/userModel");
const customError_1 = require("./../utils/customError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserFromToken_1 = require("./../utils/getUserFromToken");
const createAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return next(new customError_1.CustomError('Please enter details.', 404));
        }
        const newUser = yield userModel_1.User.create({ name, email, password });
        const accessToken = (0, jsonwebtoken_1.sign)({ id: newUser.id }, 'JWT_Secret');
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    created_at: newUser.created_at
                },
                meta: {
                    access_token: accessToken
                }
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.createAccount = createAccount;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new customError_1.CustomError('Please enter details.', 404));
        }
        let user = yield userModel_1.User.findOne({ email: email }).select('+password');
        if (!user) {
            return next(new customError_1.CustomError('Account not found.', 404));
        }
        if (!(yield bcryptjs_1.default.compare(password, user.password))) {
            return next(new customError_1.CustomError('Email or Password invalid.', 401));
        }
        const accessToken = (0, jsonwebtoken_1.sign)({ id: user.id }, 'JWT_Secret');
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
                },
                meta: {
                    access_token: accessToken
                }
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.signIn = signIn;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, getUserFromToken_1.getUserFromAuthToken)(req, res, next);
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
                }
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getMe = getMe;
//# sourceMappingURL=authController.js.map