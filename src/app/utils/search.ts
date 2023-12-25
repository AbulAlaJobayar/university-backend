import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuerObj";
import { FilterQuery } from "mongoose";

export const search=<T>(modelQuery:Query<T[], T>,query:TQueryObj)=>{
if(query.searchTerm){
   const fieldValue= Object.values(modelQuery.model.schema.paths)
   const searchField=fieldValue.filter((fieldObj)=>{
if(fieldObj.instance ==="String"){
    return true
}
   }).map((fieldObj)=>({
    [fieldObj.path]:{$regex:query.searchTerm, $options:'i' }
   })as FilterQuery<T>)
   modelQuery.find({$or:searchField})
}
return modelQuery
}