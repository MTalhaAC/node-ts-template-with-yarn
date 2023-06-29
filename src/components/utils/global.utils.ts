import { Request} from "express";
import { IUser } from "../models/user.models";

export const returnObjectFromRequestBody = (
  req: Request,
): IUser => {
  return Object.keys(req.body).includes("data")
    ? ({
        username: req.body.data.username,
        password: req.body.data.password,
      } as IUser)
    : ({
        username: req.body.username,
        password: req.body.password,
      } as IUser);
};
