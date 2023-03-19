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
exports.createCommunity = void 0;
const customError_1 = require("./../utils/customError");
const communityModel_1 = require("./../model/communityModel");
const createCommunity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return next(new customError_1.CustomError('Provide community name.', 403));
        }
        // const user =         
        const newCommunity = yield communityModel_1.Community.create({
            name: name,
            owner: 7043095415236738000
        });
        res.status(200).json({
            status: true,
            content: {
                data: {
                    id: newCommunity.id,
                    name: newCommunity.name,
                    slug: newCommunity.slug,
                    owner: newCommunity.owner,
                    created_at: newCommunity.created_at,
                    updated_at: newCommunity.updated_at
                }
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.createCommunity = createCommunity;
//# sourceMappingURL=communityController.js.map