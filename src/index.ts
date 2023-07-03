import * as dotenv from "dotenv";
import cors from "cors";
import routes from "./components/routes/index.routes";
import express, { Express } from "express";
import Configs from "./components/configs/index.configs";
import middlewares from "./components/middlewares/index.middleware";
import morgan from "morgan";
import passport from "passport";
import session from "express-session";
import services from "./components/services/index.service";
import { Users } from "./components/models/user.models";

// * Config the .env file here
dotenv.config();

export const LOCAL_MONGODB_URL: string = process.env.LOCAL_MONGODB_URL!;
export const MONGODB_URL: string = process.env.MONGODB_URL!;

// * create the instence of Express
const app: Express = express();

// * setup the middleware

app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SECRET_API_KEY!, // Replace with your own session secret key
    resave: false,
    saveUninitialized: false,
    store: services.sessionStore,
    name: Math.random().toString(),
  })
);

// * passport middleware

app.use(passport.initialize());
app.use(passport.session());
Configs.passportConfig(passport);


// * middleware to handle the logs functionality.
app.use(middlewares.logsMiddleware);
app.use(middlewares.FileLogsMiddleware);
// * Called the Mongoose Config here

Configs.ConfigMongoose("Server");
// * use the all route over here

app.use(routes.HomeRoute);
app.use(routes.logRoutes);
app.use(routes.AuthenticationRoutes);
app.use(routes.TokenRoutes);

// * Listen the server at localhost:3000
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
