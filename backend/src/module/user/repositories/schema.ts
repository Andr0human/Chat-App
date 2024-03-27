import mongoose from "mongoose";
import IUser from "../entities/IUser";

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default userSchema;
