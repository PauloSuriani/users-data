type CustommerProps = {
  id: number;
  contato?: string;
  razao_social?: string;
  nome_fantasia?: string;
  rua?: string;
  nro?:string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string; 
  cidade?: string;
  uf?: string;
}
  
export function CustommerCardToPrint(props: CustommerProps) {

  return (
    <div className="CustommerCard">

      <div style={{display: 'flex'}}>
        <div>{props.contato}</div>
        <span style={{paddingInline: '5px'}}>{` - `}</span>
        <b><label style={{fontSize:'15px', paddingRight: '5px'}}>Nro.Registro:</label></b>
        <div>{props.id}</div>
      </div>

      <div style={{display: 'flex'}}>
        <b><label style={{fontSize:'15px',paddingRight: '5px'}}>Razão Social:</label></b>
        <div>{props.razao_social}</div>
      </div>

      <div style={{display: 'flex'}}>
        <b><label style={{fontSize:'15px',paddingRight: '5px'}}>Nome Fantasia:</label></b>
        <div>{props.nome_fantasia}</div>
      </div>
      <div style={{display: 'flex'}}>
        <b><label style={{fontSize:'15px',paddingRight: '5px'}}>Fone:</label></b>
        <div>{props.telefone}</div>
      {/* </div>
      <div style={{display: 'flex'}}> */}
        <b><label style={{fontSize:'15px',paddingInline: '5px'}}>CNPJ:</label></b>
        <div>{props.cnpj}</div>
      </div>
      <div style={{display: 'flex'}}>
        <b><label style={{fontSize:'15px',paddingRight: '5px'}}>Email:</label></b>
        <div>{props.email}</div>
      </div>

      <div style={{display: 'flex'}}>
        <b><label style={{fontSize:'15px',paddingRight: '5px'}}>Município:</label></b>
        <div>{props.cidade}</div>
        <span style={{paddingInline: '5px'}}>{` - `}</span>
        <div>{props.uf}</div>
      </div>
      
      <div style={{display: 'flex'}}>
        <b><label style={{fontSize:'15px',paddingRight: '5px'}}>Endereço:</label></b>
        <div style={{display: 'flex'}}>
          <div>{props.rua}</div>
          <span>{`, `}</span>
          <div style={{paddingLeft: '5px'}}>{props.nro}</div>
        </div>
      {/* </div>
      <div style={{display: 'flex'}}> */}
        {/* <label>Bairro:</label> */}
        <div style={{paddingLeft: '5px'}}>{props.bairro}</div>
      </div>
      
      {/* <button>Adicionar à lista</button> */}
    </div>
  )
}
      