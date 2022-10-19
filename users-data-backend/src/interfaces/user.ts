export default interface User {
  id?: number;
  contato?: string;
  razao_social?: string;
  nome_fantasia?: string;
  logradouro?: string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string; 
  cidade?: string;
  uf?: string;
  role: string;
}