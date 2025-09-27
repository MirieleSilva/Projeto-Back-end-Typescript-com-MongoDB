import { Request, Response, NextFunction } from "express";
import { PerfumeService } from "../services/perfume.service";

export class PerfumeController {
  constructor(private service: PerfumeService) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.service.create(req.body);
      res.status(201).json(created);
    } catch (e) {
      next(e);
    }
  };

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this.service.list());
    } catch (e) {
      next(e);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const found = await this.service.get(req.params.id);
      if (!found) return res.status(404).json({ error: "Perfume não encontrado" });
      res.json(found);
    } catch (e) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(await this.service.update(req.params.id, req.body));
    } catch (e) {
      next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.service.delete(req.params.id);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  };
}
