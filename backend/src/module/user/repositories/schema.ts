import { Schema } from 'mongoose';
import IUser from '../entities/IUser';

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    bio: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
    rooms: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  },
  { timestamps: true }
);

export default userSchema;
