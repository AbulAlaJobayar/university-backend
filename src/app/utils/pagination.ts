import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuerObj";

export const pagination=<T>(modelQuery:Query<T[],T>,query:TQueryObj)=>{
if(query.page ||query.limit){
    const page= Number(query.page) ||1
    const limit= Number(query.limit) ||10
    const skip=(page-1)*limit
    modelQuery.skip(skip).limit(limit)
}else{
    modelQuery.skip(0).limit(10)
}
return modelQuery
}