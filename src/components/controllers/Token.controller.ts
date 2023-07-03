import { Request, Response } from "express";

export const Get_Token = async (req: Request, res: Response): Promise<void> => {
  res.send("Soon send the information of token");
};

export const Create_Token_POST = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({});
};
