import { NextFunction, Request, Response } from "express";
import { ILog } from "../models/logs.models";
import utils from "../utils/index.utils";
import { FileLogsMiddleware } from "./filelogs.middleware";

export type TOptionalILogs = Partial<Omit<ILog, "userId" & "userAgent">>;

const logsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const meta: ILog = {
    endpoint: `${req.protocol}://${req.rawHeaders[req.rawHeaders.length - 3]}`,
    requestMethod: req.method,
    requestUrl: req.originalUrl,
    responseStatusCode: res.statusCode,
    timestamp: new Date(),
    userId: "",
    userIpAddress: req.ip,
    requestPayload: { Payload: req?.body },
    userAgent: req.headers["user-agent"],
  };

  // * response payload tracking for json response only
  utils
    .createLogs({
      db: process.env.LOCAL_MONGODB_URL + "Server",
      collection: "logs",
      level: "info",
      options: { useUnifiedTopology: true },
    })
    .log("info", "Info-Logs", meta);
  next();
};


const ErrorLogs = (meta: { error: unknown } & TOptionalILogs) => {
  utils
    .createErrorLogs({
      db: process.env.LOCAL_MONGODB_URL + "Server",
      collection: "errors",
      level: "error",
      options: { useUnifiedTopology: true },
    })
    .log("error", "Errors_Logs", meta);
};

const middlewares = {
  logsMiddleware,
  ErrorLogs,
  FileLogsMiddleware,
};

export default middlewares;
