"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const customError_1 = require("./utils/customError");
const errorController_1 = __importDefault(require("./controller/errorController"));
const authRoutes_1 = require("./routes/authRoutes");
const communityRoutes_1 = require("./routes/communityRoutes");
const roleRoutes_1 = require("./routes/roleRoutes");
dotenv.config();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect('mongodb://root:root1234@127.0.0.1:27017/theInternetFolks?authSource=admin')
    .then(() => {
    app.listen(PORT);
    console.log(`Listening On PORT ${PORT}`);
}).catch(err => console.log(`Error: ${err}`));
app.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'This is home route.'
    });
});
app.use('/v1/auth', authRoutes_1.authRouter);
app.use('/v1/community', communityRoutes_1.communityRouter);
app.use('/v1/role', roleRoutes_1.roleRouter);
app.get('*', (req, res, next) => {
    next(new customError_1.CustomError(`The Route ${req.originalUrl} is not defined`, 400));
});
app.use(errorController_1.default);
//# sourceMappingURL=app.js.map