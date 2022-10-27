import { useState, useEffect } from "react";
import { CustommerCard } from "../components/CustommerCard";
import { Link } from 'react-router-dom';

type CustommerObject = {
  contato?: string;
  razao_social?: string;
  nome_fantasia?: string;
  rua?: string;
  nro?: string;
  bairro?: string;
  telefone?: string;
  cnpj?: string;
  email?: string; 
  cidade?: string;
  uf?: string;
}

export function NewCustommerForm() {
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [newCustommer, setNewCustommer] = useState({});

  // const fields = ['contato',  'razao_social', 'nome_fantasia', 'logradouro', 'bairro', 'telefone', 'cnpj', 'email', 'cidade', 'uf'];
  

  function handleAddBtnClick() {
    console.log('setNewCustommer:', newCustommer as FormData);
      // setPrintScreen(false);
      fetch('http://localhost:3000/user', {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
        body: JSON.stringify(newCustommer)
      })
      // .then(response => response.json())
      .then(res => {
        console.log(res);
        if(res.status == 201){
          setConfirmScreen(true);
        }
      })
      .catch(err => console.log(err));
  }

  function cleanInputs() {
    let custommer:CustommerObject = {};
    setNewCustommer(custommer);
    setConfirmScreen(false);
  }

  function updateInputValue(event:any) {
    let custommer:CustommerObject = newCustommer;
    const value:any = event.target.value;
    const field:string = event.target.id;
    if ('contato' == field ||  'razao_social' == field || 'nome_fantasia'== field ||
     'rua' == field || 'bairro' == field || 'telefone' == field || 'cnpj' == field || 
     'email'== field || 'cidade' == field || 'uf'== field || 'nro'== field) 
    {
      custommer[field] = value;
    }
    setNewCustommer(custommer);
  }
  
  return (
    confirmScreen ?
      <div> 
        <Link to="/" >{`<< Voltar à Página Inicial`}</Link>
        <h2>Cliente Cadastrado com Sucesso!</h2>
        <button onClick={cleanInputs}>Adicionar Novo Cliente</button>

      </div>
    : 
    <div className="NewCustommerForm">
      <Link to="/" > Voltar à página inicial </Link>
      <h1>Cadastrar Novo Cliente</h1>
      
      <div className="NewCustommerForm" style={{display: 'block'}}>
        <h2>Dados Pessoais</h2>
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Contato</label>
        <input type="text" id="contato" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>R.Social</label>
        <input type="text" id="razao_social" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>N.Fantasia</label>
        <input type="text" id="nome_fantasia" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Cnpj</label>
        <input type="text" id="cnpj" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Email</label>
        <input type="text" id="email" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Telefone</label>
        <input type="text" id="telefone" onChange={evt => updateInputValue(evt)}/> 

        <h2>Endereço</h2>
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Logradouro</label>
        <input type="text" id="rua" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Nro.</label>
        <input type="text" id="nro" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Bairro</label>
        <input type="text" id="bairro" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Cidade</label>
        <input type="text" id="cidade" onChange={evt => updateInputValue(evt)}/> 
        <label style={{paddingRight: '5px', fontSize: '18px', display: 'block'}}>Estado</label>
        <input type="text" id="uf" onChange={evt => updateInputValue(evt)}/> 

      </div>

      <button onClick={handleAddBtnClick}>Adicionar</button>
      <Link to="/" >Cancelar</Link>
    </div>
  )
}
    