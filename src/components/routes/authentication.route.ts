import { Router } from "express";
import Controllers from "../controllers/index.controller";
import passport from "passport";

export const AuthenticationRoutes: Router = Router();

// * Login routes
AuthenticationRoutes.get("/auth/login",Controllers.Login.Login_GET);
AuthenticationRoutes.post("/auth/login",passport.authenticate('local'),Controllers.Login.Login_POST);

//* Registration routes
AuthenticationRoutes.get("/auth/register",Controllers.Registration.Register_GET);
AuthenticationRoutes.post("/auth/register",Controllers.Registration.Register_POST);

//* Logout routes
AuthenticationRoutes.post("/auth/logout",Controllers.Logout.Logout_POST);




