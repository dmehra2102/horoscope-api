import { model, Schema } from "mongoose";
import { UserDocument, UserModelInterface, ZodiacSign } from "@/interfaces";

const userSchema = new Schema<UserDocument, UserModelInterface>({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, "Please fill a valid email address"],
  },
  password: { type: String, required: true },
  birthDate: { type: Date, required: true },
  zodiac_sign: { type: String, enum: ZodiacSign, required: true },
});

export const UserModel = model("User", userSchema);
