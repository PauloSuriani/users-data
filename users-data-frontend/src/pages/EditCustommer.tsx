import { useState, useEffect } from "react";
import { CustommerCard } from "../components/CustommerCard";
import { Link } from 'react-router-dom';
import { CustommerCardToPrint } from "../components/CustommerCardToPrint";

type CustommerProps = {
    id?: number;
    contato?: string;
    razao_social?: string;
    nome_fantasia?: string;
    rua?: string;
    bairro?: string;
    telefone?: string;
    cnpj?: string;
    email?: string; 
    cidade?: string;
    uf?: string;
    nro?: string;
  }

export function EditCustommer() {
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [editedCustommer, setEditedCustommer] = useState<CustommerProps>();
  const [custommerId, setCustommerId] = useState(String);
//   const [searchParams, setSearchParams] = useSearchParams();
// searchParams.get("__firebase_request_key")

  // const fields = ['contato',  'razao_social', 'nome_fantasia', 'logradouro', 'bairro', 'telefone', 'cnpj', 'email', 'cidade', 'uf'];
  useEffect(() => {
    console.log(editedCustommer);
    const params = new URLSearchParams(window.location.href);
    const len:number = window.location.href.length;
    const url:string = window.location.href;
    let userId:string = '';
    const splited = url.split('');
    let sliced:string = url.slice(len-1);
    userId = userId + sliced;
    sliced = url.slice(len-2);
    if (!sliced.includes('/')){
      userId = sliced;
    }
    sliced = url.slice(len-3);
    if (!sliced.includes('/')){
      userId = sliced;
    }
    setCustommerId(userId);

    const fetchUrl = `http://localhost:3000/user/:${userId}`;
    fetch(fetchUrl)
    .then(response => response.json())
    .then(res => setEditedCustommer(res))
    .catch(err => console.log(err));
  }, []);

  function updateInputValue(event:any) {
    console.log('editedCustommer', editedCustommer);
    let custommer:CustommerProps = {};
    if (editedCustommer != undefined){
        custommer = editedCustommer;
    }
    const value:any = event.target.value;
    const field:string = event.target.id;
    if ('contato' == field ||  'razao_social' == field || 'nome_fantasia'== field ||
     'rua' == field || 'bairro' == field || 'telefone' == field || 'cnpj' == field || 
     'email'== field || 'cidade' == field || 'uf'== field || 'nro'== field) 
    {
      custommer[field] = value;
      console.log('custommer Alterado', custommer);
    }
    
    setEditedCustommer(custommer);
  }

  function handleUpdateBtnClick(){
    const url = `http://localhost:3000/update/${custommerId}`;
    console.log('em handleUpdateBtnClick:',editedCustommer);
    fetch(url, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
      body: JSON.stringify(editedCustommer)
    })
    // .then(response => response.json())
    .then(res => {
      console.log(res);
      if(res.status == 200){
        setConfirmScreen(true);
      }
    })
    .catch(err => console.log(err));
  }

  function handleDeleteBtnClick(){
    const url = `http://localhost:3000/delete/${custommerId}`;
    fetch(url, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json', 'Acept': '*/*' }
    })
    // .then(response => response.json())
    .then(res => {
      console.log(res);
      if(res.status == 200){
        setConfirmScreen(true);
      }
    })
    .catch(err => console.log(err));
  }
  
  return (
    confirmScreen ?
      <div> 
        <Link to="/" >{`<< Voltar à Página Inicial`}</Link>
        <h2>Cliente Alterado com Sucesso!</h2>
        {/* <button onClick={cleanInputs}>Adicionar Novo Cliente</button> */}

      </div>
    : 
    <div className="NewCustommerForm">
      <Link to="/" > Voltar à página inicial </Link>
      <h1>{`Editar Cliente Nro.Registro: ${custommerId}`}</h1>
      
      <div className="NewCustommerForm" style={{display: 'block'}}>
        <h2>Dados Pessoais</h2>
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Contato</label>
        <input type="text" id="contato" defaultValue={editedCustommer?.contato} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>R.Social</label>
        <input type="text" id="razao_social" defaultValue={editedCustommer?.razao_social} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>N.Fantasia</label>
        <input type="text" id="nome_fantasia" defaultValue={editedCustommer?.nome_fantasia} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Cnpj</label>
        <input type="text" id="cnpj" defaultValue={editedCustommer?.cnpj} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Email</label>
        <input type="text" id="email" defaultValue={editedCustommer?.email} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Telefone</label>
        <input type="text" id="telefone" defaultValue={editedCustommer?.telefone} onInput={evt => updateInputValue(evt)}/> 

        <h2>Endereço</h2>
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Logradouro</label>
        <input type="text" id="rua" defaultValue={editedCustommer?.rua} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Nro.</label>
        <input type="text" id="nro" defaultValue={editedCustommer?.nro} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Bairro</label>
        <input type="text" id="bairro" defaultValue={editedCustommer?.bairro} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Cidade</label>
        <input type="text" id="cidade" defaultValue={editedCustommer?.cidade} onInput={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Estado</label>
        <input type="text" id="uf" defaultValue={editedCustommer?.uf} onInput={evt => updateInputValue(evt)}/> 

      </div>

      <button onClick={handleUpdateBtnClick}>Atualizar</button>
      <button onClick={handleDeleteBtnClick}>Excluir</button>
      <Link to="/" >Cancelar</Link>
    </div>
  )
}
    