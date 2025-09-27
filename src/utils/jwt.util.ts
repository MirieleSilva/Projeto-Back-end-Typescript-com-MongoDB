import jwt, { SignOptions, Secret } from "jsonwebtoken";
import type { StringValue } from "ms";
import config from "../config";

export type JwtPayload = { sub: string; email: string; role: "admin" | "user" };

const jwtSecret: Secret = config.jwt.secret as string;

const signOptions: SignOptions = {
  expiresIn: config.jwt.expiresIn as unknown as StringValue,
};

export const signToken = (payload: JwtPayload): string =>
  jwt.sign(payload, jwtSecret, signOptions);

export const verifyToken = (token: string): JwtPayload =>
  jwt.verify(token, jwtSecret) as JwtPayload;

