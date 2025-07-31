import { Schema, model, Document, Types } from "mongoose"

export interface IRefreshToken extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  tokenId: string;
  createdAt: Date;
  userAgent: string;
  ipAddress: string;
}

const refresTokenSchema = new Schema<IRefreshToken>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  tokenId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "365d" },
  userAgent: { type: String, required: true },
  ipAddress: { type: String, required: true }
})

export const RefreshTokenModel = model<IRefreshToken>("RefreshToken", refresTokenSchema)