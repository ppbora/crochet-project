import type { ObjectId } from "mongoose";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface User {
      _id?: string | Types.ObjectId; 
      username?: string; 
      refreshToken?: string
    }
  }
}
