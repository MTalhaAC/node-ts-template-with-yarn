import { Request,Response} from "express";


export const Register_GET = async (req:Request,res:Response):Promise<void> =>{
    try {
        res.send("User Data Here Soon!");
    } catch (error) {
        
    }
}
export const Register_POST = async (req:Request,res:Response):Promise<void> =>{
    try {
        res.send("Successfully Registers!");
    } catch (error) {
        
    }
}