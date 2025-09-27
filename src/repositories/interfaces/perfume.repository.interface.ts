import { Perfume } from "../../models/perfume.model";
export interface IPerfumeRepository {
  create(p: Omit<Perfume,"id"|"criadoEm"|"atualizadoEm">): Promise<Perfume>;
  list(): Promise<Perfume[]>;
  findById(id: string): Promise<Perfume|null>;
  update(id: string, patch: Partial<Omit<Perfume,"id"|"criadoEm">>): Promise<Perfume|null>;
  delete(id: string): Promise<boolean>;
}
