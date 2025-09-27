import { z } from "zod";

export const UpdateEstoqueDto = z.object({
  quantidade: z.number().int().nonnegative(),
});
export type UpdateEstoqueDto = z.infer<typeof UpdateEstoqueDto>;
