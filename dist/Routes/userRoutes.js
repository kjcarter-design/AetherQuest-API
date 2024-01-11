"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controllers/UserController");
const router = express_1.default.Router();
router.post('/register', UserController_1.userController.register);
router.post('/login', UserController_1.userController.login);
router.get('/user/:id', UserController_1.userController.getUser);
router.put('/user/:id', UserController_1.userController.updateUser);
router.delete('/user/:id', UserController_1.userController.deleteUser);
exports.default = router;
