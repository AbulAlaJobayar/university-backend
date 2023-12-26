/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { any } from 'zod';
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

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    //send response without password
    const { password, passwordHistory, ...otherField } = result.toObject()
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
    const { password, passwordHistory, ...otherField } = user.toObject()
    return {
        user: otherField,
        token: accessToken
    }

}


const userChangedPassword = async (userData: JwtPayload, payload: { currentPassword: string, newPassword: string }) => {
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
        throw new AppError(httpStatus.NOT_FOUND, 'Your password matches a previous password. Please input a unique password!')
    }

    // hash password
    const hashPassword = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_slat_round))
    //check and updatePassword
    const updatedPasswordHistory = [
        { password: hashPassword, timeStamp: new Date() },
        ...(user?.passwordHistory?.slice(0, 1) || []),
    ]
    const updatePassword = await User.findByIdAndUpdate(user._id, {
        password: hashPassword,
        passwordChangedAt: new Date(),
        passwordHistory: updatedPasswordHistory
    }, { new: true })
    const { password, passwordHistory, ...otherField } = updatePassword?.toObject() as any
    return otherField



}
export const userService = {
    createUserIntoDB,
    loginUser,
    userChangedPassword
}