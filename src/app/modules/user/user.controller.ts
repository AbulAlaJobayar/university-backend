import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";
import { userService } from "./user.service";

const createUserIntoDB=catchAsync(async(req:Request,res:Response)=>{
   const result= await userService.createUserIntoDB(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: result
      })
})
const loginUser =catchAsync(async(req:Request,res:Response)=>{
   const result= await userService.loginUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User login successful',
        data: result
      })
})
export const userController={
    createUserIntoDB,
    loginUser,
}