import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  googleId?: string; // Optional for Google OAuth
  firstName: string;
  lastName: string;
  campaigns: mongoose.Types.ObjectId[]; // Array of campaign IDs
  characters: mongoose.Types.ObjectId[]; // Array of character IDs
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_]{3,30}$/, // Username can contain alphanumeric characters and underscores
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Standard email format
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$.!%*#?&]/, // Password with at least one uppercase, one lowercase, and one number
  },
  firstName: {
    type: String,
    required: true,
    match: /^[a-zA-Z]{2,30}$/, // First name with only letters
  },
  lastName: {
    type: String,
    required: true,
    match: /^[a-zA-Z]{2,30}$/, // Last name with only letters
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  campaigns: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  }],
  characters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Character',
  }],
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);
