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
exports.getAllRoles = exports.createNewRole = void 0;
const customError_1 = require("./../utils/customError");
const roleModel_1 = require("./../model/roleModel");
const getUserFromToken_1 = require("./../utils/getUserFromToken");
const createNewRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, getUserFromToken_1.getUserFromAuthToken)(req, res, next);
        const { name, scopes } = req.body;
        if (!name)
            return next(new customError_1.CustomError('Provide role name and scopes.', 403));
        const newRole = yield roleModel_1.Role.create({
            name,
            scopes
        });
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newRole.id,
                    name: newRole.name,
                    created_at: newRole.created_at,
                    updated_at: newRole.updated_at
                }
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.createNewRole = createNewRole;
const getAllRoles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, getUserFromToken_1.getUserFromAuthToken)(req, res, next);
        const roles = yield roleModel_1.Role.find().populate('');
        res.status(200).json({
            status: true,
            meta: {
                total: roles.length,
                pages: Math.ceil(roles.length / 10),
            },
            data: roles
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getAllRoles = getAllRoles;
//# sourceMappingURL=rolesController.js.map