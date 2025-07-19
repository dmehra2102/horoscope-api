import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import { UserDocument, UserModelInterface, ZodiacSign } from "@/interfaces";

const userSchema = new Schema<UserDocument, UserModelInterface>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, bcrypt.genSaltSync(8));
  }

  next();
});

export const UserModel = model("User", userSchema);
