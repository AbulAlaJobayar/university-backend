import { Query } from "mongoose";
import { TQueryObj } from "../types/TQuerObj";

export const SelectedField=<T>(modelQuery:Query<T[],T>,query:TQueryObj)=>{
if(query.fields){
  const fields=query.fields.split(',').join(' ') 
  modelQuery.select(fields)
}
return modelQuery
}