import { NextFunction, Request,Response} from "express";

export const Login_GET = async (req:Request,res:Response):Promise<void> =>{
    try {
        
        res.send("<h1>Login Response</h1>");
    } catch (error) {
        
    }
}

export const Login_POST = async(req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
       
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}