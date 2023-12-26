/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcrypt";
export const comparePassword=async(password:string,hash:any)=>{
  const result =await bcrypt.compare(password, hash);
  return result
}