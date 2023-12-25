

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorResponse = {
    statusCode: number
    success: 'error' | 'fail' | 'false',
    message: string,
    errorMessage: string,
    errorDetails: TErrorIssue, 
}
export type TErrorIssue = {
    stringValue: string,
    valueType: string,
    kind: string,
    value: string,
    path: string | number,
    reason: any,
    name: string,
    message: string
}
export type TZodIssue={
path:string,
message:string,
expected?:unknown,
received?:unknown,
code?:unknown,
}
export type TZodErrorResponse={
    statusCode:number,
    success:'false',
    message:'validation Error'
    errorMessage:string,
    errorDetails:{
        issues:TZodIssue[],
        name:string,
    }
}