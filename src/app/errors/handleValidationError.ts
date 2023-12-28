/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TErrorResponse } from "../types/TErrorResponse";

const handleValidationError = (err: mongoose.Error.ValidationError,): TErrorResponse => {
    const errorValues = Object.values(err.errors)
    const errorDetails: any = []
    errorValues.forEach((errObj) => {
        errorDetails.push({
            stringValue: errObj.value,
            valueType: typeof errObj.value,
            kind: errObj.kind,
            value: errObj.value,
            path: errObj.path,
            reason: errObj.reason,
            name: errObj.name,
            message: errObj.message,
        })
    })

    return {
        statusCode: 400,
        success: 'false',
        message: 'validation Error',
        errorMessage: `${err.message!} `,
        errorDetails,
    }
}

export default handleValidationError