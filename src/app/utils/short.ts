import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuerObj";

export const sort=<T>(modelQuery:Query<T[],T>,query:TQueryObj)=>{
if(query.sortBy && query.sortOrder){
    const sortBy=query.sortBy
    const sortOrder=query.sortOrder
    const sortStr=`${sortOrder==="desc"?'-':''}${sortBy}`
    modelQuery.sort(sortStr)
}
return modelQuery
}