import { Types } from "mongoose";
import { IEstoqueRepository } from "../interfaces/estoque.repository.interface";
import { EstoqueItem } from "../../models/estoque.model";
import { EstoqueModel } from "../../infra/mongo/schema/estoque.schema";

export class EstoqueMongoRepository implements IEstoqueRepository {
  private toDomain(doc: any): EstoqueItem {
    return {
      perfumeId: String(doc.perfumeId),
      quantidade: doc.quantidade,
      atualizadoEm: doc.atualizadoEm ?? new Date(),
    };
  }

  async get(perfumeId: string): Promise<EstoqueItem | null> {
    const doc = await EstoqueModel.findOne({
      perfumeId: new Types.ObjectId(perfumeId),
    }).lean();
    return doc ? this.toDomain(doc) : null;
  }

  async set(perfumeId: string, quantidade: number): Promise<EstoqueItem> {
    const doc = await EstoqueModel.findOneAndUpdate(
      { perfumeId: new Types.ObjectId(perfumeId) },
      { $set: { quantidade, atualizadoEm: new Date() } },
      { upsert: true, new: true, lean: true }
    );
    return this.toDomain(doc!);
  }

  async list(): Promise<EstoqueItem[]> {
    const docs = await EstoqueModel.find().lean();
    return docs.map((d) => this.toDomain(d));
  }

  async delete(perfumeId: string): Promise<boolean> {
    const r = await EstoqueModel.deleteOne({
      perfumeId: new Types.ObjectId(perfumeId),
    });
    return r.deletedCount === 1;
  }
}
