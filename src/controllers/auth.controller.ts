import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  constructor(private service: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.service.login(email, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  };
}
