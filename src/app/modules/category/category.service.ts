import { JwtPayload } from "jsonwebtoken";
import { TCategory } from "./category.interface";
import { Category } from "./category.model";
import { User } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";



const createCategoryIntoDB = async (userData:JwtPayload, payload: TCategory): Promise<TCategory> => {
    // const result = await Category.create(payload);

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
    const result = await Category.create(payload);
    return result

}

const getAllCategoryFromDB = async () => {
    // const courseQuery = new QueryBuilder(Course.find().populate({path:'createdBy',select:'_id username email role'}),query).search(courseSearchableFields).filter().sort().paginate().fields()
    
    // const meta= await courseQuery.countTotal();
    // const data= await courseQuery.modelQuery;
    // return{
    //     meta,
    //     data
    // }
   

    const result = await Category.find().populate({path:'createdBy',select:'_id username email role'})
    return result
}
export const categoryService = {
    createCategoryIntoDB,
    getAllCategoryFromDB
}