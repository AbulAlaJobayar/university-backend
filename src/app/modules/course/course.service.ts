
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
import { filter } from "../../utils/filter";
import { search } from "../../utils/search";
import { sort } from "../../utils/short";
import { pagination } from "../../utils/pagination";
import { SelectedField } from "../../utils/selectedField";
//import QueryBuilder from "../../builder/QueryBulder";
//import { courseSearchableFields } from "./course.constant";


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
    
    const filteredQuery = filter(Course.find(), query)
    const searches = search(filteredQuery, query)
    const sorted = sort(searches, query)
    const paginated = pagination(sorted, query)
    const field = SelectedField(paginated, query).populate({path:'createdBy',select:'_id username email role'})
    if (query?.level){
        return await Course.find({'details.level':query.level }).populate({path:'createdBy',select:'_id username email role'})      
    }
    else if(query.provider){
        return await Course.find({'provider':query.provider }).populate({path:'createdBy',select:'_id username email role'})  
    }
    else if(query.language){
        return await Course.find({'language':query.language }).populate({path:'createdBy',select:'_id username email role'}) 
    }
    else if(query.durationInWeeks){
        return await Course.find({'durationInWeeks':query.durationInWeeks }).populate({path:'createdBy',select:'_id username email role'})   
    }
    
    return field

    
    
    // const courseQuery = new QueryBuilder(Course.find().populate({path:'createdBy',select:'_id username email role'}),query).search(courseSearchableFields).filter().sort().sortBy().minAndMaxPrice().paginate().fields()
    
    // const meta= await courseQuery.countTotal();
    // const courses= await courseQuery.modelQuery;
    // return{
    //     meta,
    //     courses
    // }
   
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

        const course = await Course.findById(id).populate({path:'createdBy',select:'_id username email role'}).session(session)
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
    const bestCourse = await Course.findById(bestCourseID).populate({path:'createdBy',select:'_id username email role'});

    return {
        course: bestCourse,
        averageRating:aggregationR[0].averageRating.toFixed(2),
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