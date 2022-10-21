export default interface Address {
  id?: number;
  rua?: string;
  nro?: string;
  bairro?: string;
  cidade: string;
  uf: string;
  user_id: number;
}