import DotEnv from "dotenv";
DotEnv.config();
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Users } from "../models/user.models"; // Replace with your User model
import passport from "passport";
import { Request } from "express";

export const SECRET_KEY: string = process.env.SECRET_KEY!;

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY, // Replace with your own secret key
  jsonWebTokenOptions: { complete: true, algorithms: ["HS256"] },
  passReqToCallback: false,
  algorithms: ["HS256"],
};

export const passportConfig = (passport: any) => {
  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await Users.findOne({
          username: jwtPayload.payload.payload.username,
        });
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
