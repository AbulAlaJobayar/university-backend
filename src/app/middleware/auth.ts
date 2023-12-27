import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import config from '../config';
import { User } from '../modules/user/user.model';
import { User_role } from '../modules/user/user.constant';

const auth = (...roles: Array<User_role>) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        // check if token is missing
        if (!token) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized')
        }
        //verify toke is valid
        const decoded = jwt.verify(token, config.access_token_secret)
        const { email, id, iat, role } = decoded as JwtPayload

        //check user is valid
        const user = await User.findOne({ _id: id })
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, 'user not found')
        }
        //check email is valid
        if (!user.email === email) {
            throw new AppError(httpStatus.NOT_FOUND, ' email does not match')
        }
        //check password change time is less then jwt issue time 
        // convert time to number
        const passwordChangTime = user.passwordChangedAt as Date;
        const convertPasswordChangedTime = new Date(passwordChangTime).getTime() / 1000;

        if (iat && convertPasswordChangedTime > iat) {
            throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
        }
        if (roles && !roles.includes(role)) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized !',
            );
          }

        // if (!(user.role === role) && roles.includes(user?.role)) {
        //     throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized')
        // }
        // if (!roles.includes(user?.role)) {
        //     throw new Error('You are not authorized to create user')
        //   }
        req.user = decoded as JwtPayload & { role: string };
        next()

    })
}
export default auth