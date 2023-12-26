import { JwtPayload } from 'jsonwebtoken';
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import httpStatus from "http-status";
import jwt, { JwtPayload } from 'jsonwebtoken'
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { comparePassword } from "./user.utils";
import config from "../../config";

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    //send response without password
    const { password, ...otherField } = result.toObject()
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
    const accessToken = jwt.sign(jwtPayload, config.access_token_secret, { expiresIn: '1h' });
   //filtered out  password from user
    const { password, ...otherField } = user.toObject()
    return {
        user:otherField,
        token:accessToken
    }

}
const userChangedPassword=async(userData:JwtPayload,payload:{currentPassword:string,newPassword:string})=>{

const decoded=jwt.verify(userData, config.access_token_secret);
console.log(decoded)
}
export const userService = {
    createUserIntoDB,
    loginUser,
    userChangedPassword
}