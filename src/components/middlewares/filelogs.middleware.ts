import { NextFunction, Request, Response } from "express";
import { ILog } from "../models/logs.models";
import services from "../services/index.service";

export const FileLogsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
{
  const meta: ILog = services.createProperties( req, res);
  services.localLogs( meta );
  next();
};
