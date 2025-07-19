import { JWTPayload } from "@/middlewares";
import * as express from "express"; // Import express if you need to reference its types

declare global {
  namespace Express {
    interface Request {
      user: JWTPayload;
    }
  }
}
