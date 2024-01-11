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
exports.userController = exports.UserController = void 0;
const user_1 = require("../models/user");
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const existingUser = yield user_1.User.findOne({ email });
                if (existingUser) {
                    res.status(409).send('Email already in use');
                    return;
                }
                const newUser = new user_1.User({ username, email, password });
                yield newUser.save();
                res.status(201).json({ message: 'User registered successfully' });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    getUserProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const username = req.params.username;
                const user = yield user_1.User.findOne({ username: username }).select('-password');
                if (!user) {
                    res.status(404).send({ message: 'User not found' });
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).send({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updateData = req.body;
                const updatedUser = yield user_1.User.findByIdAndUpdate(userId, updateData, {
                    new: true,
                }).select('-password');
                if (!updatedUser) {
                    res.status(404).send('User not found');
                    return;
                }
                res.status(200).json(updatedUser);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const deletedUser = yield user_1.User.findByIdAndDelete(userId);
                if (!deletedUser) {
                    res.status(404).send('User not found');
                    return;
                }
                res.status(200).json({ message: 'User deleted successfully' });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
exports.userController = new UserController();
