import { EstoqueItem } from "../../models/estoque.model";
export interface IEstoqueRepository {
  get(perfumeId: string): Promise<EstoqueItem|null>;
  set(perfumeId: string, quantidade: number): Promise<EstoqueItem>;
  list(): Promise<EstoqueItem[]>;
  delete(perfumeId: string): Promise<boolean>;
}
