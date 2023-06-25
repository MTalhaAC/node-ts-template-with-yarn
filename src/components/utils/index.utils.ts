import { Model, Schema } from "mongoose";
import { ILog, LogModel } from "../models/logs.models";
import winston, { Logger } from 'winston';
import 'winston-mongodb';
import { MongoDBConnectionOptions } from "winston-mongodb";



const createLogs = (options: MongoDBConnectionOptions):Logger => {

    return winston.createLogger({
        transports: [
            new winston.transports.MongoDB({
                ...options,
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.metadata(), // Enable metadata
                    winston.format.json() // Use JSON format
                ),
            })
        ]
    })
}




const createNewModels = <T extends Schema>(model: Model<T>, schema: Schema) => {
    return new model({ ...schema });
}


const utils = {
    createNewModels,
    createLogs,
}

export default utils;