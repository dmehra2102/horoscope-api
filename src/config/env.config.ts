import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  PORT,
  NDOE_ENV,
  LOG_FORMAT,
  SECRET_KEY,
  MONGODB_URI,
  COOKIE_DOMAIN,
} = process.env;
