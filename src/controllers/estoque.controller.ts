import { Request, Response, NextFunction } from "express";
import { EstoqueService } from "../services/estoque.service";

export class EstoqueController {
  constructor(private service: EstoqueService) {}

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try { res.json(await this.service.list()); } catch (e) { next(e); }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const item = await this.service.get(req.params.perfumeId);
      res.json(item ?? { perfumeId: req.params.perfumeId, quantidade: 0 });
    } catch (e) { next(e); }
  };

  set = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { quantidade } = req.body;
      const item = await this.service.set(req.params.perfumeId, quantidade);
      res.json(item);
    } catch (e) { next(e); }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.perfumeId);
      res.status(204).send();
    } catch (e) { next(e); }
  };
}

