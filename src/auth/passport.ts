import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';
require('dotenv').config();

// JWT Strategy
interface JwtPayload {
  id: string;
  email: string;
}

passport.use(
  'jwt',
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwtPayload: JwtPayload, done: VerifiedCallback) => {
      try {
        const user = await User.findOne({ email: jwtPayload.email });
        if (!user) {
          return done(null, false, { message: 'User does not exist' });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

// Local Strategy
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// // Facebook Strategy
// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "/auth/facebook/callback",
//     profileFields: ['id', 'emails', 'name']
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       // Find or create a user in your database
//       // Example: Check if user exists using profile.id
//       // If not, create a new user
//     } catch (err) {
//       return done(err, false);
//     }
//   }
// ));

// // Google Strategy
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "/auth/google/callback"
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       // Find or create a user in your database
//       // Example: Check if user exists using profile.id
//       // If not, create a new user
//     } catch (err) {
//       return done(err, false);
//     }
//   }
// ));

export const validateJwtMiddleware = passport.authenticate('jwt', { session: false });
export const initializePassportMiddleware = passport.initialize();
