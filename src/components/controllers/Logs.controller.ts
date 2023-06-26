import { Request, Response } from "express";
import Models from "../models/index.models";
import middlewares from "../middlewares/index.middleware";
import utils from "../utils/index.utils";


export const getLogs = async ( req: Request, res: Response ): Promise<void> =>
{
    try
    {
        let doc = await Models.LogModel.find( {}, {}, {} );
        res.json( doc );
    } catch ( error )
    {
        middlewares.ErrorLogs( {
            ...utils.createProperties(req,res),
            error
        } )
        console.error( error );
    }

};

export const createLogs = async ( req: Request, res: Response ): Promise<void> =>
{
    try
    {
        res.send( "Post Logs Working Correctly" );
    } catch ( error )
    {
        middlewares.ErrorLogs( { error } )
        res.errored;
    }
}
