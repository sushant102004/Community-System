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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromAuthToken = void 0;
const customError_1 = require("./customError");
const jsonwebtoken_1 = require("jsonwebtoken");
const userModel_1 = require("./../model/userModel");
const getUserFromAuthToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else {
            return next(new customError_1.CustomError('You are not logged in. Authorization token not provided.', 401));
        }
        const decoded = (0, jsonwebtoken_1.verify)(token, 'JWT_Secret');
        const user = yield userModel_1.User.findOne({ id: decoded.id });
        if (!user) {
            return next(new customError_1.CustomError('You are not logged in. Authorization token not provided.', 401));
        }
        return user;
    }
    catch (err) {
        return next(err);
    }
});
exports.getUserFromAuthToken = getUserFromAuthToken;
//# sourceMappingURL=getUserFromToken.js.map