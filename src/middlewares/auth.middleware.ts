import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

export function authGuard(requiredRole: "admin" | "user" = "user") {
  return (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Missing or invalid token" });
    }
    try {
      const payload = verifyToken(header.split(" ")[1]);
      (req as any).user = payload;
      if (requiredRole === "admin" && payload.role !== "admin") {
        return res.status(403).json({ error: "Forbidden" });
      }
      next();
    } catch {
      return res.status(401).json({ error: "Invalid token" });
    }
  };
}
