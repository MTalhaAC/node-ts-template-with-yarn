import { Request, Response } from "express";
import { IUser, Users } from "../models/user.models";
import { hashPassword } from "../utils/password.utils";
import utils from "../utils/index.utils";
import services from "../services/index.service";

export const Register_GET = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.send("User Data Here Soon!");
  } catch (error) {
    services.handleTheErrorLogs(req,res,error);
  }
};
export const Register_POST = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password} = utils._GlobalUtils.returnObjectFromRequestBody(req);

    const existingUser = await Users.findOne({ username });

    if (existingUser) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new Users({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    services.handleTheErrorLogs(req,res,error);
    res.status(500).json({ message: "Server error" });
  }
};
