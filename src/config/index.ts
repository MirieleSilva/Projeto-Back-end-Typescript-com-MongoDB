import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 3333),
  jwt: {
    secret: process.env.JWT_SECRET ?? "dev_secret",
    expiresIn: process.env.JWT_EXPIRES_IN ?? "1h",
  },
};
export default config;
