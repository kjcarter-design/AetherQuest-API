import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
	username: string;
	email: string;
	password: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		match: /^[a-zA-Z0-9_]{3,30}$/,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$.!%*#?&]/,
	},
});

userSchema.pre<IUser>('save', async function (next) {
	if (this.isModified('password') || this.isNew) {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
