import { Router } from "express";
import Controllers from "../controllers/index.controller";

export const TokenRoutes:Router = Router();

TokenRoutes.get('/creates/token',Controllers.tokens.Get_Token);

TokenRoutes.post('/creates/token',Controllers.tokens.Create_Token_POST);


// TokenRoutes.put('creates/token/{id}');
// TokenRoutes.delete('/creates/token');


