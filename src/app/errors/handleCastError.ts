import mongoose from "mongoose";
import { TErrorResponse } from "../types/TErrorResponse";

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
    const errorDetails = {
        stringValue: err.value,
        valueType: typeof err.value,
        kind: err.kind,
        value: err.value,
        path: err.path,
        reason: err.reason,
        name: err.name,
        message: err.message
    }
    return {
        statusCode: 400,
        success: 'false',
        message: 'invalid id',
        errorMessage: `${err.value} is not a valid ID! `,
        errorDetails,
    }
}
export default handleCastError