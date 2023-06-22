import * as dotenv from 'dotenv';
import cors from 'cors'
import routes from './components/routes/index.routes';
import express, { Request, Response, Express, NextFunction } from 'express';
import HomeRoute from './components/routes/default';



// * Config the .env file here
dotenv.config();

// * create the instence of Express 
const app: Express = express();

// * setup the middleware 

app.use(cors());
app.use(express.json({ limit: '50mb' }));




// * use the all route over here

app.use(HomeRoute);



// * Listen the server at localhost:3000
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
