import * as dotenv from 'dotenv';
import cors from 'cors'
import routes from './components/routes/index.routes';
import express, { Request, Response, Express, NextFunction } from 'express';
import Configs from './components/configs/index.configs';




// * Config the .env file here
dotenv.config();

// * create the instence of Express 
const app: Express = express();

// * setup the middleware 

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// * Called the Mongoose Config here

Configs.ConfigMongoose("Server");


// * use the all route over here

app.use(routes.HomeRoute);
app.use(routes.logRoutes);



// * Listen the server at localhost:3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
