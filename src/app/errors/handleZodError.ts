/* eslint-disable @typescript-eslint/no-explicit-any */

import {TZodIssue } from "../types/TErrorResponse";

const handleZodError = (err: any): any => {
    const issues = err.issues.map((issue: TZodIssue) => {
        return {
            expected: issue?.expected,
            received: issue.received,
            code: issue.code,
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        }
    })
    return {
        statusCode: 400,
        success: 'false',
        message: 'Validation Error',
        errorMessage: err.issues.map((error: any) => error.message).join('. '),
        errorDetails: { issues, name: err.name }
    }
}
export default handleZodError