import { MongooseOptions } from "mongoose";
import { MONGODB_URI } from "./env.config";

export const dbConnection: { uri: string; options: MongooseOptions } = {
  uri: MONGODB_URI,
  options: {
    autoIndex: false,
    autoCreate: false,
  },
};
