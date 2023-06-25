import {Router,Request,Response} from 'express';
import Controllers from '../controllers/index.controller';

const logRoutes = Router();

logRoutes.get("/logs",Controllers.logs.getLogs);
logRoutes.post('/logs',Controllers.logs.createLogs);






export default logRoutes;