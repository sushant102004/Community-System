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
exports.getMyJoinedCommunities = exports.getMyOwnedCommunities = exports.getAllMembers = exports.getAllCommunities = exports.createCommunity = void 0;
const customError_1 = require("./../utils/customError");
const communityModel_1 = require("./../model/communityModel");
const getUserFromToken_1 = require("./../utils/getUserFromToken");
const memberModel_1 = require("./../model/memberModel");
const createCommunity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return next(new customError_1.CustomError('Provide community name.', 403));
        }
        let userID;
        yield (0, getUserFromToken_1.getUserFromAuthToken)(req, res, next).then((user) => userID = user.id);
        const newCommunity = yield communityModel_1.Community.create({
            name,
            owner: userID
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
const getAllCommunities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const communities = yield communityModel_1.Community.find().populate({
            path: 'owner',
            model: 'User',
            select: 'name',
            foreignField: 'id'
        });
        res.status(200).json({
            status: true,
            meta: {
                total: communities.length,
                pages: Math.ceil(communities.length / 10),
            },
            data: communities
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getAllCommunities = getAllCommunities;
const getAllMembers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const communityID = req.params.id;
        const members = yield memberModel_1.Member.find({
            community: communityID
        }).populate({
            path: 'user',
            model: 'User',
            select: 'name',
            foreignField: 'id'
        }).populate({
            path: 'role',
            model: 'Role',
            select: 'name',
            foreignField: 'id'
        });
        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: members.length,
                    pages: Math.ceil(members.length / 10),
                },
                data: members
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getAllMembers = getAllMembers;
const getMyOwnedCommunities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myID;
        yield (0, getUserFromToken_1.getUserFromAuthToken)(req, res, next).then((user) => {
            myID = user.id;
        });
        const communities = yield communityModel_1.Community.find({
            owner: myID
        });
        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: communities.length,
                    pages: Math.ceil(communities.length / 10),
                },
                data: communities
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getMyOwnedCommunities = getMyOwnedCommunities;
const getMyJoinedCommunities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let myID;
        yield (0, getUserFromToken_1.getUserFromAuthToken)(req, res, next).then((user) => {
            myID = user.id;
        });
        const communities = yield memberModel_1.Member.find({
            user: myID
        }).select('-id').select('-user').select('-role').select('-created_at').populate({
            path: 'community',
            model: 'Community',
            select: 'community',
            foreignField: 'id'
        });
        res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: communities.length,
                    pages: Math.ceil(communities.length / 10),
                },
                data: communities
            }
        });
    }
    catch (err) {
        return next(err);
    }
});
exports.getMyJoinedCommunities = getMyJoinedCommunities;
//# sourceMappingURL=communityController.js.map