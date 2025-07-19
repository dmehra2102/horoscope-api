import {
  UserHoroscopeLogDocument,
  UserHoroscopeLogModelInterface,
  ZodiacSign,
} from "@/interfaces";
import { model, Schema } from "mongoose";

const userHoroscopeLogSchema = new Schema<
  UserHoroscopeLogDocument,
  UserHoroscopeLogModelInterface
>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    zodiac_sign: { type: String, enum: ZodiacSign, required: true },
    horoscopeText: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserHoroscopeLogModel = model(
  "UserHoroscopeLog",
  userHoroscopeLogSchema
);
