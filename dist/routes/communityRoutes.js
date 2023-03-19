"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityRouter = void 0;
const express_1 = require("express");
const communityController_1 = require("./../controller/communityController");
const communityRouter = (0, express_1.Router)();
exports.communityRouter = communityRouter;
communityRouter.route('/').post(communityController_1.createCommunity).get(communityController_1.getAllCommunities);
communityRouter.route('/:id/members').get(communityController_1.getAllMembers);
communityRouter.route('/me/owner').get(communityController_1.getMyOwnedCommunities);
communityRouter.route('/me/member').get(communityController_1.getMyJoinedCommunities);
//# sourceMappingURL=communityRoutes.js.map