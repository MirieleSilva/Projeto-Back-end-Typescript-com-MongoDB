import { Router } from "express";
import { PerfumeController } from "../controllers/perfume.controller";
import { validate } from "../middlewares/validate.middleware";
import { CreatePerfumeDto, UpdatePerfumeDto } from "../dtos/perfume.dto";
import { authGuard } from "../middlewares/auth.middleware";
import { makePerfumeService } from "./_wire";

const router = Router();
const controller = new PerfumeController(makePerfumeService());

router.use(authGuard());
router.get("/", controller.list);
router.get("/:id", controller.get);
router.post("/", validate(CreatePerfumeDto), controller.create);
router.put("/:id", validate(UpdatePerfumeDto), controller.update);
router.delete("/:id", controller.delete);
export default router;

