type CustommerProps = {
  id: number;
  contato?: string;
  razao_social?: string;
  nome_fantasia?: string;
  endereco?: string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string; 
  cidade?: string;
  estado?: string;

}

export function CustommerCardToPrint(props: CustommerProps) {

  return (
    <div className="CustommerCard">
      <div>
        <label>Nro.Registro</label>
        <div>{props.id}</div>
      </div>
      <div>
        <label>Razão Social</label>
        <div>{props.razao_social}</div>
      </div>
      <div>
        <label>Nome Fantasia</label>
        <div>{props.nome_fantasia}</div>
      </div>
      <div>
        <label>Cidade</label>
        <div>{props.cidade}</div>
      </div>
      <div>
        <label>Endereço</label>
        <div>{props.endereco}</div>
      </div>
      <div>
        <label>Bairro</label>
        <div>{props.bairro}</div>
        <label>Fone</label>
        <div>{props.telefone}</div>
      </div>
      <div>
        <label>CNPJ</label>
        <div>{props.cnpj}</div>
      </div>
      <div>
        <label>Email</label>
        <div>{props.email}</div>
      </div>
      <div>
        <label>Contato</label>
        <div>{props.contato}</div>
      </div>
      <div>
        <label>{`Data de Entrega __/__/____`}</label>
      </div>
      
      {/* <button>Adicionar à lista</button> */}
    </div>
  )
}
    