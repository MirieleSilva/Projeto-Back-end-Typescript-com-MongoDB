import { Schema, model, InferSchemaType } from "mongoose";

export const PerfumeSchema = new Schema({
  nome: { type: String, required: true, minlength: 2 },
  marca: { type: String, required: true, minlength: 2 },
  ml: { type: Number, required: true, min: 1 },
  lote: { type: String },
  preco: { type: Number, min: 0 },
}, { timestamps: { createdAt: "criadoEm", updatedAt: "atualizadoEm" } });

export type PerfumeDoc = InferSchemaType<typeof PerfumeSchema> & { _id: string };
export const PerfumeModel = model("Perfume", PerfumeSchema);
