import { IEstoqueRepository } from "../repositories/interfaces/estoque.repository.interface";

export class EstoqueService {
  constructor(private repo: IEstoqueRepository) {}
  get(perfumeId: string) { return this.repo.get(perfumeId); }
  set(perfumeId: string, quantidade: number) { return this.repo.set(perfumeId, quantidade); }
  list() { return this.repo.list(); }
  delete(perfumeId: string) { return this.repo.delete(perfumeId); }
}
