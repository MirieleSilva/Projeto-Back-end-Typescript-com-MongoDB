import { Request, Response, NextFunction } from "express";

export function requestLogger(req: Request, _res: Response, next: NextFunction) {
  const start = Date.now();
  const { method, originalUrl } = req;
  _res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`${method} ${originalUrl} -> ${_res.statusCode} (${ms}ms)`);
  });
  next();
}
