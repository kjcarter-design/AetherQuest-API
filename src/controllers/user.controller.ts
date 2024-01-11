import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../models/user';
import passport from 'passport';
import jwt from 'jsonwebtoken';

export class UserController {
	public async register(req: Request, res: Response): Promise<void> {
		try {
			const { username, email, password } = req.body;
			const existingUser = await User.findOne({ email });

			if (existingUser) {
				res.status(409).send('Email already in use');
				return;
			}

			const newUser = new User({ username, email, password } as IUser);
			await newUser.save();

			res.status(201).json({ message: 'User registered successfully' });
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	public async getUserProfile(req: Request, res: Response): Promise<void> {
		try {
			const username = req.params.username;
			const user = await User.findOne({ username: username }).select('-password');
	
			if (!user) {
				res.status(404).send({ message: 'User not found' });
				return;
			}
	
			res.status(200).json(user);
		} catch (error: any) {
			res.status(500).send({ message: error.message });
		}
	}
	

	public async updateUser(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.params.id;
			const updateData = req.body;

			const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
				new: true,
			}).select('-password');

			if (!updatedUser) {
				res.status(404).send('User not found');
				return;
			}

			res.status(200).json(updatedUser);
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}

	public async deleteUser(req: Request, res: Response): Promise<void> {
		try {
			const userId = req.params.id;
			const deletedUser = await User.findByIdAndDelete(userId);

			if (!deletedUser) {
				res.status(404).send('User not found');
				return;
			}

			res.status(200).json({ message: 'User deleted successfully' });
		} catch (error: any) {
			res.status(500).send(error.message);
		}
	}
}

export const userController = new UserController();
