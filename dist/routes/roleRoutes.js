"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleRouter = void 0;
const express_1 = require("express");
const rolesController_1 = require("./../controller/rolesController");
const roleRouter = (0, express_1.Router)();
exports.roleRouter = roleRouter;
roleRouter.route('/').post(rolesController_1.createNewRole).get(rolesController_1.getAllRoles);
//# sourceMappingURL=roleRoutes.js.map