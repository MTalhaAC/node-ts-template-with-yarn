import { Model, Schema } from "mongoose";
import { MongoDBConnectionOptions } from "winston-mongodb";
import { TOptionalILogs } from "../middlewares/index.middleware";
import { Request, Response } from "express";
import winston, { Logger } from 'winston';
import 'winston-mongodb';



const createLogs = ( options: MongoDBConnectionOptions ): Logger =>
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
            } )
        ]
    } )
}


const createErrorLogs = createLogs;

const createNewModels = <T extends Schema> ( model: Model<T>, schema: Schema ) =>
{
    return new model( { ...schema } );
}


const createProperties =  ( req: Request, res: Response ) =>
{
    return {
        endpoint: `${req.protocol}://${req.rawHeaders[ 1 ]}`,
        requestMethod: req.method,
        requestUrl: req.originalUrl,
        timestamp: new Date(),
    } as TOptionalILogs;
}

const utils = {
    createNewModels,
    createLogs,
    createErrorLogs,
    createProperties,
}

export default utils;