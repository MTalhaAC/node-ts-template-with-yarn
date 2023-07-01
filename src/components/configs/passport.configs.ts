import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import { Users } from "../models/user.models"; // Replace with your User model
import passport from "passport";
import { Request } from "express";

export const SECRET_KEY: string = "hello fucker!";

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
        console.log(jwtPayload);
        const user = await Users.findOne({
          username: jwtPayload.payload.payload.username,
        });
        // Replace with your User model method to find a user by ID
        console.log("passportConfigs", user);
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

// // Session serialization and deserialization
// passport.serializeUser((req: any, user: any, done: any) => {
//   console.log("serialize", user);
//   done(null, { username: user.username, password: user.password });
// });

// passport.deserializeUser(async (id: any, done: any) => {
//   try {
//     const user = await Users.findById({ id }); // Replace with your User model method to find a user by ID
//     if (user) {
//       done(null, user);
//     } else {
//       done(null, false);
//     }
//   } catch (error) {
//     done(error, false);
//   }
// });
