import mongoose, { Model, FilterQuery } from 'mongoose';

class BaseRepository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  countDocuments = async (filters: FilterQuery<T>): Promise<number> => {
    const result: number = await this.model.countDocuments(filters);
    return result;
  };

  findAll = async (
    filters: any,
    sortBy: string,
    fields: string,
    page: number,
    limit: number
  ): Promise<T[]> => {
    const skip: number = (page - 1) * limit;
    const result: T[] = await this.model
      .find(filters)
      .sort(sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit);
    return result;
  };

  getById = async (id: string, fields: string): Promise<T | null> => {
    const result: T | null = (await this.model
      .findById(id)
      .select(fields)) as T | null;
    return result;
  };

  createOne = async (data: T): Promise<T | null> => {
    const result: T | null = await this.model.create(data);
    return result;
  };

  deleteById = async (id: string): Promise<mongoose.mongo.DeleteResult> => {
    const result = await this.model.deleteOne({ _id: id } as any);
    return result;
  };

  deleteAll = async (): Promise<mongoose.mongo.DeleteResult> => {
    const result = await this.model.deleteMany({});
    return result;
  };
}

export default BaseRepository;
