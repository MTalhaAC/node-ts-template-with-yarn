import { Request,Response} from "express";


export const Logout_POST = async (req:Request,res:Response):Promise<void> =>{
    try {
        res.send("Successfully logout!");
    } catch (error) {
        
    }
}