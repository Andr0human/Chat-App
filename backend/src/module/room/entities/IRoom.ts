import { Types } from 'mongoose';
import { IBase } from '../../../lib/base';
import IChat from './IChat';

interface IRoom extends IBase {
  name: string;
  description?: string;
  users: Types.ObjectId[]; // Array of user references
  admins: Types.ObjectId[]; // Array of user IDs who are admins
  chats: IChat[]; // Array of chat messages
}

export default IRoom;
