import {Router,Request,Response} from 'express';
import Controllers from '../controllers/index.controller';

const logRoutes = Router();

logRoutes.get("/logs",Controllers.logs.getLogs);







export default logRoutes;