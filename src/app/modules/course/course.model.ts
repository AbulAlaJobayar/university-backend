import { Schema, model } from "mongoose";
import TCourse, { TDetails, TTags } from "./course.interface";
const tagsSchema = new Schema<TTags>({

    name: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true

    }
}, { _id: false })
const detailsSchema = new Schema<TDetails>({
    level: {
        type: String,
        enum:['Beginner', 'Intermediate','Advanced']
    },
    description: {
        type: String,
        required: true
    }
}, { _id: false })
const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: [true, 'please input title'],
        unique: true
    },
    instructor: {
        type: String,
        required: [true, 'please input instructor name']
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    price: {
        type: Number,
        required: [true, 'please input  price']
    },
    tags: {
        type: [tagsSchema],
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    details: {
        type: detailsSchema,
        required: true
    },
    createdBy:{
        type: Schema.Types.ObjectId,
      ref: 'User',
    }
},{
    timestamps:true,
    toJSON: {
        virtuals: true,
        
      },
   versionKey:false, 
     
})
courseSchema.virtual('durationInWeeks').get(function() {
const startDate=new Date(this.startDate) ;
const endDate=new Date(this.endDate) ;
const estimateDate = endDate.getTime() - startDate.getTime();
const weeks=Math.ceil(estimateDate / (7 * 24 * 60 * 60 * 1000))
return weeks
  });
export const Course = model<TCourse>('Course', courseSchema)