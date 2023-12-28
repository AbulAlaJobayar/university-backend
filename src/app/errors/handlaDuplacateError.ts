/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose'
import { TErrorResponse } from '../types/TErrorResponse'


const handlerDuplicateError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const regex = /"(.*?)"/
  const matches = err.message.match(regex)
  const errorDetails :any= [
    {
        path: '',
        message: `${matches![1]} is already exist`,
    },
  ]

  return {
    statusCode: 409,
    success: 'false',
    message: 'Duplicate Error',
    errorMessage: `${matches![1]} is already Exist! `,
    errorDetails,
   
  }
}

export default handlerDuplicateError
