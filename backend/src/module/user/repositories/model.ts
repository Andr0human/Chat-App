import { model, Model } from 'mongoose';
import { IUser } from '../entities';
import userSchema from './schema';

const userModel: Model<IUser> = model<IUser>('User', userSchema);

export default userModel;
