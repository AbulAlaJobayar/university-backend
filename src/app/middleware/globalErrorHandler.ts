/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";
import { TGlobalErrorResponse } from "../types/GlobalTerrorErrorResponse";
import mongoose from "mongoose";
import handleCastError from "../errors/handleCastError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";


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
    }

    res.status(statusCode).json({
        success: success,
        message: message,
        errorMessage: errorMessage,
        errorDetails: errorDetails,
        stuck: config.node_env === "development" ? err.stack : undefined,
    })
}
export default globalErrorHandler