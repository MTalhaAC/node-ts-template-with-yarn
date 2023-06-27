import { Router } from "express";

export const AuthenticationRoutes: Router = Router();

// * Login routes
AuthenticationRoutes.get("/auth/login");
AuthenticationRoutes.post("/auth/login");

//* Registration routes
AuthenticationRoutes.get("/auth/register");
AuthenticationRoutes.post("/auth/login");

//* Logout routes
AuthenticationRoutes.get("/auth/logout");
AuthenticationRoutes.post('/auth/logout');



