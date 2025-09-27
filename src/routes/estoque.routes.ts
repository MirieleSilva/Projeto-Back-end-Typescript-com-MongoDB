import { Router } from "express";
import { EstoqueController } from "../controllers/estoque.controller";
import { validate } from "../middlewares/validate.middleware";
import { UpdateEstoqueDto } from "../dtos/estoque.dto";
import { authGuard } from "../middlewares/auth.middleware";
import { makeEstoqueService } from "./_wire";

const router = Router();
const controller = new EstoqueController(makeEstoqueService());

router.use(authGuard());
router.get("/", controller.list);                              
router.get("/:perfumeId", controller.get);
router.put("/:perfumeId", validate(UpdateEstoqueDto), controller.set);
router.delete("/:perfumeId", controller.delete);            
export default router;
