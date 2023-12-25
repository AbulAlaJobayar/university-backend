import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
const userSchema=new Schema<TUser>({
    username:{
        type:String,
        required:[true,'please provide username'],
        unique:true

    },
    email:{
        type:String,
        required:[true,'please provide valid email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'please provide uniq password'],
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
})
export const UserModel = model('User', userSchema);