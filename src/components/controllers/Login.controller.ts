import { NextFunction, Request, Response } from "express";
import utils from "../utils/index.utils";
import { IUser, Users } from "../models/user.models";
import { returnType } from "../types/global";
import services from "../services/index.service";
import Configs from "../configs/index.configs";

export const Login_GET = async (req: Request, res: Response): Promise<void> => {
  try {
    /**
     * Here send the user credentials using token based authentication soon.
     */
    res.send("<h1>Login Response</h1>");
  } catch (error) {
    services.handleTheErrorLogs(req, res, error);
  }
};

export const Login_POST = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } =
      utils._GlobalUtils.returnObjectFromRequestBody(req);

    let user = await Users.findOne({ username });

    if (!user) {
      res
        .status(404)
        .json({ message: "User doesn't exist Or incorrect username" });
      return;
    }

    let isMatch: boolean = await utils.password.comparePasswords(
      password,
      user?.password!
    );

    if (!isMatch) {
      services.handleTheErrorLogs(req, res, { message: "invalid password" });
      res.status(403).json({ message: "invalid password" });
      return;
    }
    const token = await services.createTheJWTForClient(
      {
        username: user.username,
        password: user.password,
        id: user._id,
      } as IUser,
      res,
      req,
      Configs.SECRET_KEY
    );
    // Store the token in the session
    (req.session as any).token = token;
    res.status(200).json({ message: "Login Successfully", token });
  } catch (error) {
    services.handleTheErrorLogs(req, res, error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Login_PUT = async (req: Request, res: Response): Promise<void> => {
  try {
    /**
     * Return the Payload actual body and params to search the record in database to update their body with Payload body.
     */
    const { Payload, ParamsQuery } = <returnType>(
      utils._GlobalUtils.returnObjectFromRequestBodyWithOnlyUsername(req)
    );
    let paramsUsername: string = ParamsQuery.username;

    // * Find the User in database if exist then
    const user = await Users.findOne({ username: paramsUsername });

    if (!user) {

      res
        .status(404)
        .json({ message: "User doesn't exist Or incorrect username" });
      return;
    }

    let { username } = user;

    let hashedPassword: string | undefined = Payload.password
      ? await utils.password.hashPassword(Payload.password)
      : undefined;

    const result = await Users.findOneAndUpdate(
      { username },
      { username: Payload.username, password: hashedPassword }
    );

    if (!result) {
      res.status(500).json({ message: "Server error" });
      return;
    }

    res.status(200).json({ message: "Update successfully" });
  } catch (error) {
    services.handleTheErrorLogs(req, res, error);
    res.status(500).json({ message: "Server error" });
  }
};
