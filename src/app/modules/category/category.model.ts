import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

 const categorySchema = new Schema<TCategory>({
    name: {
        type: String,
        required: [true, 'please input name'],
        unique: true,
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
    
},{
    timestamps:true
})

export const Category = model<TCategory>('Category', categorySchema)