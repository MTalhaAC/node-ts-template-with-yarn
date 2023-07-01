import jwt from "jsonwebtoken";
import { IUser, Users } from "../models/user.models";
import { Request, Response } from "express";
import utils from "../utils/index.utils";
import services from "./index.service";

// ...

type users = {
  username: string;
  password: string;
};

export const createTheJWTForClient = async (
  users: IUser,
  res: Response,
  req: Request,
  secretKey: string
) => {
  try {
    const token: string = jwt.sign({ payload: users }, secretKey, {
      expiresIn: "1h",
    }); // Replace with your own secret key
    // Return the token to the client

    return token;
  } catch (error) {
    services.handleTheErrorLogs(req, res, error);
  }
};
