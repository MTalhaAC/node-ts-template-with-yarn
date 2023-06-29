import * as dotenv from 'dotenv';
import cors from 'cors'
import routes from './components/routes/index.routes';
import express, { Express } from 'express';
import Configs from './components/configs/index.configs';
import middlewares from './components/middlewares/index.middleware';
import morgan from 'morgan';

// * Config the .env file here
dotenv.config();

export const LOCAL_MONGODB_URL: string = process.env.LOCAL_MONGODB_URL!;
export const MONGODB_URL: string = process.env.MONGODB_URL!;


// * create the instence of Express 
const app: Express = express();

// * setup the middleware 

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

// * middleware to handle the logs functionality.
app.use(middlewares.logsMiddleware);
app.use(middlewares.FileLogsMiddleware);
// * Called the Mongoose Config here

Configs.ConfigMongoose("Server");


// * use the all route over here

app.use(routes.HomeRoute);
app.use(routes.logRoutes);
app.use(routes.AuthenticationRoutes);





// * Listen the server at localhost:3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
