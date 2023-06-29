import { NextFunction, Request, Response } from "express";
import { ILog } from "../models/logs.models";
import services from "../services/index.service";

export const FileLogsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const meta: ILog = {
    endpoint: `${req.protocol}://${req.headers.host}`,
    requestMethod: req.method,
    requestUrl: req.originalUrl,
    responseStatusCode: res.statusCode,
    timestamp: new Date(),
    userId: "",
    userIpAddress: req.ip,
  };
  services.localLogs(meta);
  next();
};
