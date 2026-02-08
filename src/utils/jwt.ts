import "dotenv/config";
import jwt, { type SignOptions } from "jsonwebtoken";

const SECRET = String(process.env.JWT_SECRET);
const EXPIRES = Number(process.env.JWT_EXPIRES_IN);

if (!SECRET) {
  throw new Error("SECRET is not defined and is mandatory on .env!");
}

if (!EXPIRES) {
  throw new Error("EXPIRES is not defined and is mandatory on .env!");
}

type PayloadJwt = { id: string; email: string };

export function sign(payload: PayloadJwt): string {
  const options: SignOptions = {
    expiresIn: EXPIRES,
  };

  return jwt.sign({ ...payload }, SECRET, options);
}

export function verify(token: string): PayloadJwt | string {
  try {
    return jwt.verify(token, SECRET) as PayloadJwt;
  } catch (error) {
    console.error(error);
    return "Token must be a valid token!";
  }
}
