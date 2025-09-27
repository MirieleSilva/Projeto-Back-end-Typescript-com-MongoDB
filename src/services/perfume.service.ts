import { IPerfumeRepository } from "../repositories/interfaces/perfume.repository.interface";
import { CreatePerfumeDto, UpdatePerfumeDto } from "../dtos/perfume.dto";

export class PerfumeService {
  constructor(private repo: IPerfumeRepository) {}

  create(dto: CreatePerfumeDto) { return this.repo.create({ ...dto }); }
  list() { return this.repo.list(); }
  get(id: string) { return this.repo.findById(id); }

  async update(id: string, dto: UpdatePerfumeDto) {
    const updated = await this.repo.update(id, dto);
    if (!updated) { const err = new Error("Perfume não encontrado"); (err as any).status = 404; throw err; }
    return updated;
  }

  async delete(id: string) {
    const ok = await this.repo.delete(id);
    if (!ok) { const err = new Error("Perfume não encontrado"); (err as any).status = 404; throw err; }
  }
}

