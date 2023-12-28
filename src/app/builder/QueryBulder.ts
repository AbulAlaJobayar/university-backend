/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);

    return this;
  }
sortBy(){
  const sortBy =this?.query?.sort as string;
  const sortOrder=this?.query?.sortOrder==='asc'?1:-1;
  if(sortBy){
    const sortObject:{[key:string]:'asc'|'desc'}={};
    sortObject[sortBy]=sortOrder as any;
    this.modelQuery=this.modelQuery.sort(sortObject);
  }
  return this;
}
minAndMaxPrice(){
  const minPrice=Number(this?.query?.minPrice);
  const maxPrice=Number(this?.query?.maxPrice);
  if(!isNaN(minPrice)){
    this.modelQuery=this.modelQuery.find({price:{$gte:minPrice}}); 
  }
  if(!isNaN(maxPrice)){
    this.modelQuery=this.modelQuery.find({price:{$lte:maxPrice}}); 
  }
  return this
}
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;

    return {
      page,
      limit,
      total,
     
    };
  }
}

export default QueryBuilder;