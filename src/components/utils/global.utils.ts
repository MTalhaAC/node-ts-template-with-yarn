import { Request } from "express";
import { IUser } from "../models/user.models";
import { returnType } from "../types/global";

export const returnObjectFromRequestBody = (req: Request): IUser => {
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

export const returnObjectFromRequestBodyWithOnlyUsername = <
  TBody extends IUser
>(
  req: Request
): returnType => {
  const Payload: TBody = Object.keys(req.body).includes("data")
    ? ({
        username: req.body.data.username,
        password: req.body.data.password,
      } as TBody)
    : ({
        username: req.body.username,
        password: req.body.password,
      } as TBody);
  const ParamsQuery = req.params;

  return {
    Payload,
    ParamsQuery,
  };
};

