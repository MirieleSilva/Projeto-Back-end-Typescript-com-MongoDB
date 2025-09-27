import { EstoqueItem } from "../../models/estoque.model";

export class EstoqueRepository {
  private data = new Map<string, EstoqueItem>();

  async get(perfumeId: string) {
    return this.data.get(perfumeId) ?? null;
  }

  async set(perfumeId: string, quantidade: number) {
    const item: EstoqueItem = { perfumeId, quantidade, atualizadoEm: new Date() };
    this.data.set(perfumeId, item);
    return item;
  }

  async list() {
    return [...this.data.values()];
  }

  async delete(perfumeId: string) {
    return this.data.delete(perfumeId);
  }
}

