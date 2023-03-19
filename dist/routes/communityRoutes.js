"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.communityRouter = void 0;
const express_1 = require("express");
const communityController_1 = require("./../controller/communityController");
const communityRouter = (0, express_1.Router)();
exports.communityRouter = communityRouter;
communityRouter.route('/').post(communityController_1.createCommunity);
//# sourceMappingURL=communityRoutes.js.map