import { ZodiacSign } from "./user.interface";
import { Document, Model, Types } from "mongoose";

export interface UserHoroscopeLog {
  userId: Types.ObjectId;
  zodiac_sign: ZodiacSign;
  horoscopeText: string;
}

export interface UserHoroscopeLogDocument extends Document, UserHoroscopeLog {}
export type UserHoroscopeLogModelInterface = Model<UserHoroscopeLogDocument>;
