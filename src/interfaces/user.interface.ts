import { Document, Model } from "mongoose";

export enum ZodiacSign {
  Aries = "Aries",
  Taurus = "Taurus",
  Gemini = "Gemini",
  Cancer = "Cancer",
  Leo = "Leo",
  Virgo = "Virgo",
  Libra = "Libra",
  Scorpio = "Scorpio",
  Sagittarius = "Sagittarius",
  Capricorn = "Capricorn",
  Aquarius = "Aquarius",
  Pisces = "Pisces",
}

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
  zodiac_sign: ZodiacSign;
}

export interface UserDocument extends Document, UserInterface {}
export type UserModelInterface = Model<UserDocument>;

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
  birthDate: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}
