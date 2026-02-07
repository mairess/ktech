import "dotenv/config";
import jwt, { type SignOptions } from "jsonwebtoken";

const _SECRET = process.env.JWT_SECRET;
const _EXPIRES = process.env.JWT_EXPIRES_IN;

if (!_SECRET) {
  throw new Error("SECRET is not defined and is mandatory on .env!");
}

if (!_EXPIRES) {
  throw new Error("EXPIRES is not defined and is mandatory on .env!");
}

const SECRET: string = _SECRET;
const EXPIRES: number = Number(_EXPIRES);

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
