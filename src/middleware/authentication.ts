import passport from 'passport';
import {
	Strategy as JwtStrategy,
	ExtractJwt,
	VerifiedCallback,
} from 'passport-jwt';
import { User } from '../models/User';

const options = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
	'jwt',
	new JwtStrategy(options, (jwtPayload, done) => {
		User.findById(jwtPayload.id, (err: any, user: any) => {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);

export default passport;
