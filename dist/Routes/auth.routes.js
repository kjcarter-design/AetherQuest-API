"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = require("../auth/passport");
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.authController.login);
router.get("/logout", passport_1.validateJwtMiddleware, auth_controller_1.authController.logout);
exports.default = router;
