type CustommerProps = {
  contato?: string;
  rSocial?: string;
  nFantasia?: string;
  endereco?: string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string; 
  cidade?: string;
  estado?: string;

}

export function CustommerCard(props: CustommerProps) {

  return (
    <div className="CustommerCard">
      <div>
        <div>Razão Social: </div>
        <div>{props.rSocial}</div>
      </div>
      <button>Adicionar à lista</button>
    </div>
  )
}
    