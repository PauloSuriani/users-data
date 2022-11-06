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
    <tr  key={`to-print-card-${props.id}`} className="CustommerCard">

      <td>
        {props.razao_social}
      </td>

      <td>
        {props.nome_fantasia}
      </td>

      <td>
        {`${props.cidade} - ${props.uf}`}
      </td>

      <td>
        {`${props.rua}, ${props.nro} ${props.bairro}`}
      </td>


      <td>
        {`${props.contato} - ${props.telefone}`}
      </td>

      <td>
        {props.id}
      </td>


      <td>
        {props.email}
      </td>
      
      <td>
        {props.cnpj}
      </td>
    </tr>
  )
}
      