import { NextFunction, Request, Response } from "express";
import { ILog } from "../models/logs.models";
import services from "../services/index.service";
import { FileLogsMiddleware } from "./filelogs.middleware";

/*
* Custome Type for the file logs object.
 */
export type TOptionalILogs = Partial<Omit<ILog, "userId" & "userAgent">>;

/**
 * * logsMiddleware is middleware that creates the logs collections in database and generate the log documents.
 * @param req  type Request
 * @param res  type Response
 * @param next type NextFunction
 */
const logsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const meta: ILog = {
    endpoint: `${req.protocol}://${req.headers.host}`,
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
  services
    .createLogs({
      db: process.env.LOCAL_MONGODB_URL + "Server",
      collection: "logs",
      level: "info",
      options: { useUnifiedTopology: true },
    })
    .log("info", "Info-Logs", meta);
  next();
};

/**
 * * ErrorLogs is a function not middleware but used the same signature like middleware. It used to create the errors collection and generates error logs documents. 
 * @param meta  type {error:unknown}
 */
const ErrorLogs = (meta: { error: unknown } & TOptionalILogs) => {
  services
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
