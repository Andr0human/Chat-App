import { Types } from 'mongoose';
import { IBase } from '../../../lib/base';

interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  bio?: string;
  friends?: Types.ObjectId[];
  isActive: boolean;
  rooms?: Types.ObjectId[]; // Array of room references
}

export default IUser;
