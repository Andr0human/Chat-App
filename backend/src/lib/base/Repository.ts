import { FilterQuery, Model } from "mongoose";

class BaseRepository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  countDocuments = async (filters: FilterQuery<T>): Promise<number> => {
    const result: number = await this.model.countDocuments(filters);
    return result;
  };

  getById = async (id: string, fields: string): Promise<T | null> => {
    const result: T | null = (await this.model
      .findById(id)
      .select(fields)) as T | null;
    return result;
  };

  create = async (data: T): Promise<T> => {
    const result: T = await this.model.create(data);
    return result;
  };

  deleteAll = async (): Promise<void> => {
    await this.model.deleteMany({});
  };
}

export default BaseRepository;
