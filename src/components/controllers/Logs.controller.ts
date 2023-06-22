import { Request,Response } from "express";

export const getLogs = async (req:Request,res:Response):Promise<void> => {
    res.send("<h1>Get Logs Working Correctly</h1>");
};

export const createLogs = async(req:Request,res:Response):Promise<void> =>{
    res.send("<h1>Post Logs Working Correctly</h1>")
}
