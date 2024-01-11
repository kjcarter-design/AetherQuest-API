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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = exports.UserController = void 0;
const User_1 = require("../models/User");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = req.body;
                const existingUser = yield User_1.User.findOne({ email });
                if (existingUser) {
                    res.status(409).send('Email already in use');
                    return;
                }
                const newUser = new User_1.User({ username, email, password });
                yield newUser.save();
                res.status(201).json({ message: 'User registered successfully' });
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    login(req, res, next) {
        passport_1.default.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({
                    message: info ? info.message : 'Login failed',
                    user,
                });
            }
            req.login(user, { session: false }, (err) => {
                if (err) {
                    return next(err);
                }
                const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET || '', {
                    expiresIn: '1h',
                });
                return res.json({ user, token });
            });
        })(req, res, next);
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield User_1.User.findById(userId).select('-password');
                if (!user) {
                    res.status(404).send('User not found');
                    return;
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).send(error.message);
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const updateData = req.body;
                const updatedUser = yield User_1.User.findByIdAndUpdate(userId, updateData, {
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
                const deletedUser = yield User_1.User.findByIdAndDelete(userId);
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
