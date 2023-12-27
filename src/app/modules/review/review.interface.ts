import { Types } from "mongoose";
export type TCreatedBy={
    _id:Types.ObjectId;
    username:string;
    email:string;
    role:string;
}
export type TReview ={
    courseId:Types.ObjectId;
    rating:number;
    review:string;
    createdBy?:TCreatedBy;
    
}
