import { Schema, model, InferSchemaType, Types } from "mongoose";

export const EstoqueSchema = new Schema({
  perfumeId: { type: Types.ObjectId, ref: "Perfume", required: true, index: true, unique: true },
  quantidade: { type: Number, required: true, min: 0 },
  atualizadoEm: { type: Date, default: () => new Date() },
});

export type EstoqueDoc = InferSchemaType<typeof EstoqueSchema> & { _id: string };
export const EstoqueModel = model("Estoque", EstoqueSchema);
