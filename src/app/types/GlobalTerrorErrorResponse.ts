export type TGlobalErrorResponse = {
    statusCode: number
    success: 'error' | 'fail'
    message: string
    errorMessage:string,
    errorDetails: TGlobalErrorIssue[]
  }
  
  export type TGlobalErrorIssue = {
    path: string | number
    message: string
  }
  