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
exports.deleteMember = exports.addMember = void 0;
const customError_1 = require("./../utils/customError");
const memberModel_1 = require("./../model/memberModel");
const addMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { community, user, role } = req.body;
        if (!community || !user || !role) {
            return next(new customError_1.CustomError('Invalid details.', 403));
        }
        const newMember = yield memberModel_1.Member.create({
            community,
            user,
            role
        });
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newMember.id,
                    community,
                    user,
                    role,
                    created_at: newMember.created_at
                }
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.addMember = addMember;
const deleteMember = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield memberModel_1.Member.findOneAndRemove({
            id: req.params.id,
        });
        res.status(200).json({
            status: true
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.deleteMember = deleteMember;
//# sourceMappingURL=memberController.js.map