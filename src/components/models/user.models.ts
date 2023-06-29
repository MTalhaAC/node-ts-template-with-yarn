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

// userSchema.pre<IUser>('save',async function(next:CallbackWithoutResultAndOptionalError){
//   const hashedPassword:string = await utils.password.hashPassword(this.password);
//   this.password = hashedPassword;
//   next();
// })

export const Users = model<IUser>('User', userSchema);
