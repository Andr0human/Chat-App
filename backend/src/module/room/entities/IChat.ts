import { Types } from 'mongoose';
import { IBase } from '../../../lib/base';

// TODO: Add readBy
interface IChat extends IBase {
  sender: Types.ObjectId; // Reference to the user who sent the message
  message: string;
}

export default IChat;
