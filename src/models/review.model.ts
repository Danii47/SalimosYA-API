import { Schema, model, Types } from "mongoose"

export interface IReview {
  user: Types.ObjectId;
  score: number;
  description: string;
  likes?: Types.ObjectId[];
  date: Date;
}

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: "The score must be an integer between 0 and 5."
    }
  },
  description: { type: String, required: true },
  likes: { type: [Schema.Types.ObjectId], ref: "User", default: [] },
  date: { type: Date, default: Date.now }
})

export const ReviewModel = model<IReview>("Review", reviewSchema)