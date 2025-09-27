import { IPerfumeRepository } from "../interfaces/perfume.repository.interface";
import { Perfume } from "../../models/perfume.model";
import { PerfumeModel } from "../../infra/mongo/schema/perfume.schema"; 

export class PerfumeMongoRepository implements IPerfumeRepository {
  toDomain(doc: any): Perfume {
    return {
      id: String(doc._id),
      nome: doc.nome, marca: doc.marca, ml: doc.ml,
      lote: doc.lote, preco: doc.preco,
      criadoEm: doc.criadoEm, atualizadoEm: doc.atualizadoEm,
    };
  }

  async create(p: Omit<Perfume,"id"|"criadoEm"|"atualizadoEm">): Promise<Perfume> {
    const created = await PerfumeModel.create(p);
    return this.toDomain(created);
    }

  async list(): Promise<Perfume[]> {
    const docs = await PerfumeModel.find().lean();
    return docs.map(this.toDomain);
  }

  async findById(id: string): Promise<Perfume|null> {
    const doc = await PerfumeModel.findById(id).lean();
    return doc ? this.toDomain(doc) : null;
  }

  async update(id: string, patch: Partial<Omit<Perfume,"id"|"criadoEm">>): Promise<Perfume|null> {
    const doc = await PerfumeModel.findByIdAndUpdate(id, patch, { new: true }).lean();
    return doc ? this.toDomain(doc) : null;
  }

  async delete(id: string): Promise<boolean> {
    const r = await PerfumeModel.findByIdAndDelete(id);
    return !!r;
  }
}
