import { Schema } from 'mongoose';
import { IChat, IRoom } from '../entities';

export const chatSchema: Schema<IChat> = new Schema<IChat>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const roomSchema: Schema<IRoom> = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    description: { type: String },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    admins: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    chats: [chatSchema],
  },
  { timestamps: true }
);

export default roomSchema;
