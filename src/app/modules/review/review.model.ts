import { Schema, model } from "mongoose";
import { TReview } from "./review.interface";



 const reviewSchema = new Schema<TReview>({
    courseId: {
      type:Schema.Types.ObjectId,
      ref: 'Course'

    },
    rating:{
        type:Number,
        required: [true, 'please input Rating'],
        min:1,
        max:5
    },
    review:{
        type:String,
        required: [true, 'please input review'],
    }
    
})

export const Review = model<TReview>('Review', reviewSchema)