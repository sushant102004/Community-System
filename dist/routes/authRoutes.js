"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("./../controller/authController");
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.route('/signup').post(authController_1.createAccount);
authRouter.route('/signin').post(authController_1.signIn);
authRouter.route('/me').get(authController_1.getMe);
//# sourceMappingURL=authRoutes.js.map