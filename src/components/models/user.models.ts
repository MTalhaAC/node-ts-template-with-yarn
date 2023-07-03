// src/models/User.ts

import  { Schema, model, Document,ObjectId} from 'mongoose';

export interface IUser extends Document {
  _id:ObjectId
  username: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, unique: true },
  password: String,
});

export const Users = model<IUser>('User', userSchema);
