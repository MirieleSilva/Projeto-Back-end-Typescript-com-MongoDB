export type Perfume = {
  id: string;
  nome: string;
  marca: string;
  ml: number;
  lote?: string;
  preco?: number;
  criadoEm: Date;
  atualizadoEm: Date;
};
