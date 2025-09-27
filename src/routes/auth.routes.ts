import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { LoginDto } from "../dtos/auth.dto";
import { makeAuthService } from "./_wire";

const router = Router();
const controller = new AuthController(makeAuthService());

router.post("/login", validate(LoginDto), controller.login);
export default router;
