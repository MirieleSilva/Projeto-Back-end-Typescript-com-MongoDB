import { z } from "zod";

export const CreatePerfumeDto = z.object({
  nome: z.string().min(2),
  marca: z.string().min(2),
  ml: z.number().int().positive(),
  lote: z.string().optional(),
  preco: z.number().positive().optional(),
});
export type CreatePerfumeDto = z.infer<typeof CreatePerfumeDto>;

export const UpdatePerfumeDto = CreatePerfumeDto.partial();
export type UpdatePerfumeDto = z.infer<typeof UpdatePerfumeDto>;
