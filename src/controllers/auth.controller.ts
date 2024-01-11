import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/user';

export class AuthController {
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (user && await bcrypt.compare(password, user.password)) {
                const payload = { id: user.id, email: user.email };
                const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
                    expiresIn: '1h'
                });

                res.json({ token, user: { id: user.id, email: user.email } });
            } else {
                res.status(400).json({ message: 'Invalid email or password' });
            }
        } catch (error: any) {
            res.status(500).send(error.message);
        }
    }

    public logout(req: Request, res: Response): void {
        // Logout logic here. Instruct the client to delete the JWT token.
        res.status(200).json({ message: 'Logout successful' });
    }
}

export const authController = new AuthController();
