import { Schema, model, Document, Types } from "mongoose"

export interface IUser extends Document {
  _id: Types.ObjectId;
  realName: string;
  username: string;
  biography?: string;
  email: string;
  password: string;
  friendRequests?: Types.ObjectId[];
  friends?: Types.ObjectId[];
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  realName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  biography: { type: String, maxLength: 160, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friendRequests: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  friends: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  avatar: { type: String, default: null },
  // lastLocals: { type: [Schema.Types.ObjectId], ref: "Local", default: [] },
  // refreshToken: { type: String, default: null }
})

export const UserModel = model<IUser>("User", userSchema)