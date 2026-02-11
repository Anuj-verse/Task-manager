import type { Request,Response,NextFunction} from "express";

export const errorHandler = (err:Error,req:Request,res:Response,next:NextFunction) => {
    res.status(500).json({
        success:false,
        error:err.message
    });
    
};