import express,{Request,Response} from "express";

const HomeRoute = express.Router();

const baseEndPoint = '/';


HomeRoute.get(baseEndPoint,(req:Request,res:Response)=>{
    res.send("Hello");
});



export default HomeRoute;