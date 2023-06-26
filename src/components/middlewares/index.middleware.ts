import { NextFunction, Request, Response } from "express";
import { ILog } from "../models/logs.models";
import utils from "../utils/index.utils";



const Logs_Path: string = process.env.MONGODB_URL + "Server";

export type TOptionalILogs = Partial<Omit<ILog,"userId" & "userAgent">>


const logsMiddleware = ( req: Request, res: Response, next: NextFunction ) =>
{
  const meta: ILog = {
    endpoint: `${req.protocol}://${req.rawHeaders[ 1 ]}`,
    requestMethod: req.method,
    requestUrl: req.originalUrl,
    responseStatusCode: res.statusCode,
    timestamp: new Date(),
    userId: "",
    userIpAddress: req.ip,
    requestPayload: { Payload: req?.body },
    userAgent: req.headers[ 'user-agent' ]
  };

  let originalSend = res.send;
  // * response payload tracking for json response only

  res.send = function ( body )
  {
    console.log( 'Response Content:', body );

    meta.responsePayload = { body };
    utils.createLogs( {
      db: Logs_Path,
      collection: "logs",
      level: "info",
      options: { useUnifiedTopology: true },
    } ).log( 'info', "Info-Logs", meta );

    return originalSend.call( this, body );
  };
  next();
}

const ErrorLogs = (meta:{ error: unknown} & TOptionalILogs) =>
{
  utils.createErrorLogs( {
    db: Logs_Path,
    collection:"Errors",
    level:"error",
    options: { useUnifiedTopology: true },
  } ).log('error','Errors_Logs',{...meta})
}
const middlewares = {
  logsMiddleware,
  ErrorLogs,
}

export default middlewares;