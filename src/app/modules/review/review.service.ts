import { JwtPayload } from "jsonwebtoken";
import { TReview } from "./review.interface";
import { Review } from "./review.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";




const createReviewIntoDB = async (userData:JwtPayload,payload: TReview): Promise<TReview> => {
    const { id, email, iat,role } = userData
    const user = await User.findOne({ _id: id }).select('+password')
    
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'user not found')
    }
    
    if (!iat) {
        throw new AppError(httpStatus.FORBIDDEN, "invalid token")
    }
   
    if (!user.email===email) {
        throw new AppError(httpStatus.NOT_FOUND, "user does not match")
    }
    if (!user.role===role) {
        throw new AppError(httpStatus.NOT_FOUND, "user does not match")
    }
   
    payload.createdBy={_id:user._id,username:user.username,email:user.email,role:user.role}
    const result = (await Review.create(payload))
    return result
}

const getAllReviewFromDB = async () => {
    const result = await Review.find()
    return result
}
export const reviewService = {
    createReviewIntoDB,
    getAllReviewFromDB
}