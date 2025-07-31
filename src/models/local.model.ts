import { Schema, model, Types } from "mongoose"

export interface ILocal {
  name: string;
  biography?: string;
  coordinates?: [number, number];
  prices?: string;
  address: string;
  website?: string;
  email: string;
  password: string;
  followers?: Types.ObjectId[];
  friends?: Types.ObjectId[];
  avatar?: string;
  reviews?: Types.ObjectId[];
  rate?: number;
  schedule: ISchedule[];
}

export interface ISchedule {
  open: string;
  close: string;
}

const localSchema = new Schema<ILocal>({
  name: { type: String, required: true },
  biography: { type: String, required: false },
  coordinates: { type: [Number], required: false },
  prices: { type: String, required: false },
  address: { type: String, required: true },
  website: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  followers: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  avatar: { type: String, required: false },
  reviews: { type: [Schema.Types.ObjectId], ref: "Review", default: [] },
  rate: { type: Number, default: 0, min: 0, max: 5 },
  schedule: {
    type: [{
      open: { type: String, required: true },
      close: { type: String, required: true }
    }],
    required: true
  },
  // minimumAge: { type: [Number], required: false },
})

export const LocalModel = model<ILocal>("Local", localSchema)