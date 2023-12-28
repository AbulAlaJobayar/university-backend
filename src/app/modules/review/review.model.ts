import { Schema, model } from "mongoose";
import { TCreatedBy, TReview } from "./review.interface";

const createdBySchema = new Schema<TCreatedBy>({
    _id: {
        type: Schema.Types.ObjectId
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String
    }
})

const reviewSchema = new Schema<TReview>({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'

    },
    rating: {
        type: Number,
        required: [true, 'please input Rating'],
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: [true, 'please input review'],
    },
    createdBy: {
        type: createdBySchema
    }
  

},{timestamps:true})

export const Review = model<TReview>('Review', reviewSchema)