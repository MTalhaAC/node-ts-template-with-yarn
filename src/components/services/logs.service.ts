import winston, { Logger, transport, transports } from "winston";
import middlewares, { TOptionalILogs } from "../middlewares/index.middleware";
import services from "./index.service";
import { MongoDBConnectionOptions } from "winston-mongodb";
import "winston-mongodb";
import { Request, Response } from "express";
import { ILog } from "../models/logs.models";
export const createLogs = ( options: MongoDBConnectionOptions ): Logger =>
{
  return winston.createLogger( {
    transports: [
      new winston.transports.MongoDB( {
        ...options,
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.metadata(), // Enable metadata
          winston.format.json() // Use JSON format
        ),
      } ),
    ],
  } );
};
export const createErrorLogs = createLogs;



export const createProperties = ( req: Request, res: Response ) =>
{
  const params = req.params;
  const query = req.query;
  const err = req.errored;
  return {
    endpoint: `${req.protocol}://${req.headers.host}`,
    requestMethod: req.method,
    requestUrl: req.originalUrl,
    timestamp: new Date(),
    params: params,
    errorMessage: err,
    query: query,
    responseStatusCode: res.statusCode,
    userIpAddress: req.ip,
    userAgent: req.headers[ "user-agent" ],
    requestPayload: req.body,
  } as ILog;
};

export const handleTheErrorLogs = (
  req: Request,
  res: Response,
  error: Error
) =>
{
  middlewares.ErrorLogs( {
    ...services.createProperties( req, res ),
    error,
  } );
};

export const localLogs = ( meta: { [ key: PropertyKey ]: any } ) =>
{
  winston
    .createLogger( {
      transports: [
        new winston.transports.File( {
          dirname: "logs",
          filename: "logs.json",
          level: "info",
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.metadata(), // Enable metadata
            winston.format.json() // Use JSON format
          ),
          handleExceptions: true,
          handleRejections: true,
          zippedArchive: true,
        } ),
      ],
    } )
    .log( "info", "file_logs", meta );
};
