import { Request, Response } from "express";
import Models from "../models/index.models";
import services from "../services/index.service";


export const getLogs = async ( req: Request, res: Response ): Promise<void> =>
{
    try
    {
        let doc = await Models.LogModel.find( {}, {}, {} );
        res.json(doc);
    } catch ( error )
    {
        console.error( "Error Message From GetLogs Methods",error );
        services.handleTheErrorLogs(req,res,error); /// ? Logs handler for Errors
    }

};

export const createLogs = async ( req: Request, res: Response ): Promise<void> =>
{
    try
    {
        res.send( "Post Logs Working Correctly" );
    } catch ( error )
    {
        services.handleTheErrorLogs(req,res,error); // ? Logs handler for Errors 
    }
}
