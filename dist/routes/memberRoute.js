"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.memberRouter = void 0;
const express_1 = require("express");
const memberController_1 = require("./../controller/memberController");
const memberRouter = (0, express_1.Router)();
exports.memberRouter = memberRouter;
memberRouter.route('/').post(memberController_1.addMember);
memberRouter.route('/:id').delete(memberController_1.deleteMember);
//# sourceMappingURL=memberRoute.js.map