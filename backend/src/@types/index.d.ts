import { UserDocument } from "../database/models/user.model";
import * as express from "express";

declare global {
  namespace Express {
    interface User extends UserDocument {}
  }
}

declare module "express" {
  interface Request {
    sessionId?: string;
  }
}
