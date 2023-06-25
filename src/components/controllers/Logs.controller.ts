import { Request,Response } from "express";
import Models from "../models/index.models";


export const getLogs = async (req:Request,res:Response):Promise<void> => {

    res.json("Post Logs Working Correctly")
};

export const createLogs = async(req:Request,res:Response):Promise<void> =>{
    res.json("Post Logs Working Correctly")
}
