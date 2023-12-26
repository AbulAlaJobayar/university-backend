
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { comparePassword } from "./user.utils";

const createUserIntoDB = async (payload: TUser) => {
    const result = await User.create(payload)
    //send response without password
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...otherField } = result.toObject()
    return otherField
}
const loginUser = async (payload: { username: string, password: string }) => {

    const user = await User.findOne({ username: payload.username }).select('+password')
    console.log(user)
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found')
    }
    //compare password to check validation
    const isPasswordValid = await comparePassword(payload.password, user.password)
    // check password
    if (!isPasswordValid) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password Does Not Match')
    }
    

    console.log(isPasswordValid)

}
export const userService = {
    createUserIntoDB,
    loginUser
}