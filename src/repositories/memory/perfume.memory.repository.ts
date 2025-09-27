import { Perfume } from "../../models/perfume.model";
import { v4 as uuid } from "uuid";

export class PerfumeRepository {
  private data = new Map<string, Perfume>();

  async create(
    p: Omit<Perfume, "id" | "criadoEm" | "atualizadoEm">
  ): Promise<Perfume> {
    const now = new Date();
    const perfume: Perfume = {
      id: uuid(),
      criadoEm: now,
      atualizadoEm: now,
      ...p,
    };
    this.data.set(perfume.id, perfume);
    return perfume;
  }

  async list(): Promise<Perfume[]> {
    return [...this.data.values()];
  }

  async findById(id: string): Promise<Perfume | null> {
    return this.data.get(id) ?? null;
  }

  async update(
    id: string,
    patch: Partial<Omit<Perfume, "id" | "criadoEm">>
  ): Promise<Perfume | null> {
    const current = this.data.get(id);
    if (!current) return null;
    const updated: Perfume = { ...current, ...patch, atualizadoEm: new Date() };
    this.data.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.data.delete(id);
  }
}
