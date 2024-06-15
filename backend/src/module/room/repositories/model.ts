import { model, Model } from 'mongoose';
import { IRoom } from '../entities';
import roomSchema from './schema';

const roomModel: Model<IRoom> = model<IRoom>('Room', roomSchema);

export default roomModel;
