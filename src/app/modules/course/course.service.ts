
/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TQueryObj } from "../../types/TQuerObj";
import TCourse from "./course.interface";
import { Course } from "./course.model"
import { Review } from "../review/review.model";
import { JwtPayload } from "jsonwebtoken";
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from "../../builder/QueryBulder";
import { courseSearchableFields } from "./course.constant";


const createCourseIntoDB = async (userData:JwtPayload,payload: TCourse): Promise<TCourse> => {
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
    payload.createdBy=user._id
    const result = await Course.create(payload);
    return result
}

const getAllCourseFromDB = async (query: TQueryObj): Promise<TCourse[] | any> => {
    const courseQuery = new QueryBuilder(Course.find().populate({path:'createdBy',select:'_id username email role'}),query).search(courseSearchableFields).filter().sort().paginate().fields()
    
    const meta= await courseQuery.countTotal();
    const data= await courseQuery.modelQuery;
    return{
        meta,
        data
    }
   
}
const updateCourseIntoDB = async (userData:JwtPayload,id: string, payload: Partial<TCourse>) => {
    const { id:tokenID, email, iat,role } = userData
    const user = await User.findOne({ _id: tokenID })
    
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
    const { tags, details, ...remainingCourse } = payload
    const updatedModifiedData: Record<string, unknown> = {
        ...remainingCourse

    }
  
    if (tags?.length) {
        tags.forEach((tag, index) => {
            updatedModifiedData[`tags.${index}.name`] = tag.name;
            updatedModifiedData[`tags.${index}.isDeleted`] = tag.isDeleted;
        });
    }
    
    if (details && Object.keys(details).length) {
        for (const [key, value] of Object.entries(details)) {
            updatedModifiedData[`details.${key}`] = value
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    const result = await Course.findByIdAndUpdate(id, updatedModifiedData, { new: true, runValidators: true }).populate({path:'createdBy',select:'_id username email role'})
    return result
}
const getCourseByReviewFromDB = async (id: string) => {
    const session = await mongoose.startSession()
    try {
        session.startTransaction()

        const course = await Course.findById(id).session(session)
        if (!course) {
            await session.abortTransaction()
            session.endSession()
            throw new Error('Course not Found')
        }
        const review = await Review.find({ courseId: id }).session(session)

        await session.commitTransaction();
        session.endSession()
        return { course, review }

    } catch (err: any) {
        await session.abortTransaction()
        session.endSession()
        throw new Error(err)
    }


}
const getBestCourseByReviewFromDB = async () => {
    const aggregationR = await Review.aggregate([
        {
            $group: {
                _id: '$courseId',
                averageRating: { $avg: '$rating' },
                reviewCount: { $sum: 1 }
            }
        },
        {
            $sort: { averageRating: -1, reviewCount: -1 }
        }, { $limit: 1 }
    ])
    const bestCourseID = aggregationR[0]._id
    const bestCourse = await Course.findById(bestCourseID);

    return {
        course: bestCourse,
        averageRating: aggregationR[0].averageRating,
        reviewCount: aggregationR[0].reviewCount,
    }
}
export const courseService = {
    createCourseIntoDB,
    getAllCourseFromDB,
    updateCourseIntoDB,
    getCourseByReviewFromDB,
    getBestCourseByReviewFromDB
}