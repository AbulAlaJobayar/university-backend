
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";
import { TGlobalErrorResponse } from "../types/GlobalTerrorErrorResponse";
import mongoose from "mongoose";
import handleCastError from "../errors/handleCastError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handlerDuplicateError from "../errors/handlaDuplacateError";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    let statusCode = err.statusCode || 500;
    let success = err.status || 'false';
    let message = err.message || 'something Went wrong'
    let errorMessage = err.errorMessage || 'something went wrong';
    let errorDetails = err.issues || []

    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err)

        statusCode = simplifiedError.statusCode;
        success = simplifiedError.success;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
        errorDetails = simplifiedError.errorDetails;


    }
    /* else if(err instanceof mongoose.Error.ValidationError){

    }*/ 
    else if (err instanceof mongoose.Error.CastError) {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        success = simplifiedError.success;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
        errorDetails = simplifiedError.errorDetails;
    }else if(err instanceof mongoose.Error.ValidationError){
        const simplifiedError = handleValidationError(err)
        statusCode = simplifiedError.statusCode;
        success = simplifiedError.success;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
        errorDetails = simplifiedError.errorDetails;
    }
    else if(err.code && err.code === 11000){
        const simplifiedError = handlerDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        success = simplifiedError.success;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessage;
        errorDetails = simplifiedError.errorDetails;
    } else if(err.message && err.message === "invalid signature" || err.message === "jwt expired" || err.message === "invalid jwt" ||err.message === "undefined jwt" ||err.message === "not authorized user" ||err.message === "access denied"){
        
        statusCode = 500;
        success =false ;
        message = "Unauthorized Access";
        errorMessage = "You do not have the necessary permissions to access this resource.";
        errorDetails = null;
        
    }
    res.status(statusCode).json({
        success: success,
        message: message,
        errorMessage: errorMessage,
        errorDetails: errorDetails,
        stuck: config.node_env === "development" ? err.stack : null,
    })
}
export default globalErrorHandler