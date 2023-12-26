
import bcrypt from 'bcrypt';
import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from '../../config';
const userSchema = new Schema<TUser>({
    username: {
        type: String,
        required: [true, 'please provide username'],
        unique: true

    },
    email: {
        type: String,
        required: [true, 'please provide valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide uniq password'],
        select:0
    },
    passwordChangedAt:{
        type:Date,
        default:null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{timestamps:true})
// hashing password

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_slat_round),
    );
    next();
  });
export const User = model('User', userSchema);