import { SignOptions, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../../database/models/session.model";
import { UserDocument } from "../../database/models/user.model";
import { config } from "../../config/app.config";
import jwt from "jsonwebtoken";

export type AccesTPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

export type RefreshTPayload = {
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const defaults: SignOptions = {
  audience: ["user"],
};

export const accesTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: config.JWT.EXPIRES_IN,
  secret: config.JWT.SECRET,
} as SignOptionsAndSecret;

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: config.JWT.REFRESH_EXPIRES_IN,
  secret: config.JWT.REFRESH_SECRET,
} as SignOptionsAndSecret;

export const signJwtToken = (
  payload: AccesTPayload | RefreshTPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...opts } = options || accesTokenSignOptions;
  return jwt.sign(payload, secret, { ...defaults, ...opts });
};

export const verifyJwtToken = <TPayload extends object = AccesTPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  try {
    const { secret = config.JWT.SECRET, ...opts } = options || {};
    const payload = jwt.verify(token, secret, {
      ...defaults,
      ...opts,
    }) as TPayload;

    return { payload };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
