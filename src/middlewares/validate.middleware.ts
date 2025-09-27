import { ZodObject, ZodRawShape } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodObject<ZodRawShape>, key: "body" | "query" | "params" = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse((req as any)[key]);
    if (!result.success) {
      return next(result.error);
    }
    (req as any)[key] = result.data;
    next();
  };

