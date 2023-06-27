import { NextFunction, Request, Response } from "express";
import { ILog } from "../models/logs.models";
import utils from "../utils/index.utils";

export const FileLogsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const meta: ILog = {
    endpoint: `${req.protocol}://${req.rawHeaders[req.rawHeaders.length -3]}`,
    requestMethod: req.method,
    requestUrl: req.originalUrl,
    responseStatusCode: res.statusCode,
    timestamp: new Date(),
    userId: "",
    userIpAddress: req.ip,
  };
  utils.localLogs(meta);
  next();
};
