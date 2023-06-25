import { NextFunction, Request, Response } from "express";
import { ILog } from "../models/logs.models";
import utils from "../utils/index.utils";



const logsMiddleware = (req: Request, res: Response, next: NextFunction) => {


    const originalSend = res.json;

    const meta: ILog = {
        endpoint: `${req.protocol}://${req.rawHeaders[1]}`,
        requestMethod: req.method,
        requestUrl: req.originalUrl,
        responseStatusCode: res.statusCode,
        timestamp: new Date(),
        userId: "",
        userIpAddress: req.ip,
        errorMessage: req.errored?.message,
        requestPayload: { Payload: req?.body },
        userAgent: req.headers['user-agent']
    };

    res.json = function (body) {
        console.log('Response Content:', body);

        meta.responsePayload = {body};
        utils.createLogs({
            db: process.env.MONGODB_URL + "Server",
            collection: "logs",
            level: "info",
            options: { useUnifiedTopology: true },

        }).log('info', "Info-Logs", meta);

        return originalSend.call(this, body);
    };
    next();
    // const meta: ILog = {
    //     endpoint: `${req.protocol}://${req.rawHeaders[1]}`,
    //     requestMethod: req.method,
    //     requestUrl: req.originalUrl,
    //     responseStatusCode: res.statusCode,
    //     timestamp: new Date(),
    //     userId: "",
    //     userIpAddress: req.ip,
    //     errorMessage: req.errored?.message,
    //     requestPayload: {Payload:req?.body},
    //     responsePayload: undefined,
    //     userAgent: req.headers['user-agent']
    //   };

    // utils.createLogs({
    //     db: process.env.MONGODB_URL + "Server",
    //     collection: "logs",
    //     level: "info",
    //     options: { useUnifiedTopology: true },

    // }).log('info',"Info-Logs",meta);
    // next();
}


const middlewares = {
    logsMiddleware,
}

export default middlewares;