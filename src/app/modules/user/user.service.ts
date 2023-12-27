/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { comparePassword } from "./user.utils";
import config from "../../config";
import { sendResponse } from '../../utils/sendResponse';
import { Response } from 'express';

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    //send response without password, passwordHistory,passwordChangedAt,
    const { password, passwordHistory,passwordChangedAt, ...otherField } = result.toObject()
    return otherField
}
const loginUser = async (payload: { username: string, password: string }) => {

    const user = await User.findOne({ username: payload.username }).select('+password')
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }
    //compare password to check validation
    const isPasswordValid = await comparePassword(payload.password, user.password)
    // check password
    if (!isPasswordValid) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password Does Not Match')
    }
    // create json web token
    const jwtPayload = {
        id: user.id,
        role: user.role,
        email: user.email
    }
    const accessToken = jwt.sign(jwtPayload, config.access_token_secret, { expiresIn:config.access_token_expire_in });
    //filtered out  password from user
    const { password, passwordHistory,passwordChangedAt,createdAt,updatedAt, ...otherField } = user.toObject() as any
    return {
        user: otherField,
        token: accessToken
    }

}


const userChangedPassword = async (res:Response,userData: JwtPayload, payload: { currentPassword: string, newPassword: string }) => {
    const { id, email, iat } = userData
    const user = await User.findOne({ _id: id }).select('+password')
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'user not found')
    }
    if (!iat) {
        throw new AppError(httpStatus.FORBIDDEN, "invalid token")
    }
    //compare password to check validation
    const isPasswordValid = await comparePassword(payload.currentPassword, user.password)
    if (!isPasswordValid) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password Does Not Match')
    }
    //check new  password in  history
    const isPasswordHistory = user?.passwordHistory?.some((pass) => bcrypt.compareSync(payload.newPassword, pass.password));
    if (isPasswordHistory) {
        sendResponse(res, {
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            message: `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${user?.passwordHistory? user.passwordHistory[0].timeStamp:''} ).`,
            data: null
        })
        throw new AppError(httpStatus.NOT_FOUND, 'Your password matches a previous password. Please input a unique password!')
    }

    // hash password
    const hashPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_slat_round))
    //check and updatePassword
    const updatedPasswordHistory = [
        { password: hashPassword, timeStamp: new Date() },
        ...(user?.passwordHistory?.slice(0, 2) || []),
    ]
    const updatePassword = await User.findByIdAndUpdate(user._id, {
        password: hashPassword,
        passwordChangedAt: new Date(),
        passwordHistory: updatedPasswordHistory
    }, { new: true })
   const {password,passwordHistory,...otherProperty}=updatePassword?.toObject as any
    return otherProperty



}
export const userService = {
    createUserIntoDB,
    loginUser,
    userChangedPassword
}