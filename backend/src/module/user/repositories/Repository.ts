import { BaseRepository } from '../../../lib/base';
import { IUser } from '../entities';
import userModel from './model';

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(userModel);
  }

  getByEmail = async (email: string): Promise<IUser | null> => {
    const result: IUser | null = await this.model.findOne({ email });
    return result;
  };

  create = async (user: IUser): Promise<IUser | null> => {
    const result: IUser | null = await this.createOne(user);
    return result;
  };

  update = async (id: string, newData: IUser): Promise<IUser | null> => {
    const result: IUser | null = await this.model.findByIdAndUpdate(
      id,
      { $set: newData },
      { new: true }
    );
    return result;
  };
}

export default UserRepository;
