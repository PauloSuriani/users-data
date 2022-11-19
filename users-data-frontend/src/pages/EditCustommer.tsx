import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../serverurl';
import MyComponent from "../components/modal/MyComponent";
import DialogProvider from "../components/modal/DialogProvider";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const navigate = useNavigate();

  const BASE_URL = api_url();

  useEffect(() => {
    const storage = localStorage.getItem('user');

    if (!storage) return navigate('/login');
    // const { token } = storage;

    if (JSON.parse(storage).token) {
      const token:string = JSON.parse(storage).token;
      console.log('token em edit custommer: ', token);

      fetch(`${BASE_URL}/login/validate`, {
        method: "GET",
        headers: {  'Authorization': token,'Content-Type': 'application/json', 'Acept': '*/*' }
      })
      .then(response => response.json())
      .then(() => {setIsAuthenticated(true); renderCustommerForEdit();})
      .catch(() => navigate('/login'));
    };

  }, [navigate]);

  function renderCustommerForEdit() {
    console.log('EditedCustomer: ', editedCustommer);
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
    sliced = url.slice(len-4);
    if (!sliced.includes('/')){
      userId = sliced;
    }

    const custommerId = userId;
    setCustommerId(custommerId);
    localStorage.setItem('custommer', JSON.stringify({ custommerId }));
    console.log('url: ', `${BASE_URL}/user/:${userId}`);

    const fetchUrl = `${BASE_URL}/user/:${userId}`;
    fetch(fetchUrl)
    .then(response => response.json())
    .then(res => setEditedCustommer(res))
    .catch(err => console.log(err));
  };

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

    const url = `${BASE_URL}/update/${custommerId}`;
    console.log('em handleUpdateBtnClick:',editedCustommer);
    fetch(url, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
      body: JSON.stringify(editedCustommer)
    })
    .then(res => {
      console.log(res);
      if(res.status == 200){
        setConfirmScreen(true);
        setTimeout(() => {
          
          navigate('/');
        }, 2000);
      }
    })
    .catch(err => console.log(err));
  };
  
  return (
    confirmScreen ?
        <h1>Muito bem! Cliente Alterado com Sucesso...</h1>
    : isAuthenticated ?
    <div className="NewCustommerForm">

      <h1>{`Editar Cliente Nro.Registro: ${custommerId}`}</h1>
      
      <div className="new-custommer-block">
        {/*BOTÕES DE NAV => HOME | ADD | DELETE */}
        <div className="div-svg-btn">
          <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/')}} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>

          <svg cursor={'pointer'} onClick={handleUpdateBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
            <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
          </svg>

          {/* COMPONENTE EXCLUIR */}
        <DialogProvider>
          <MyComponent/>
        </DialogProvider>
      </div>
        

      <div className="custommer-form">
        <div className="table-custommer-form">
          <h2 style={{textAlign: 'left', paddingTop: '0px'}}>Dados Pessoais</h2>
          <label className="form-label">Razão Social</label>
          <input className="form-input" size={34} type="text" id="razao_social" defaultValue={editedCustommer?.razao_social} onInput={evt => updateInputValue(evt)}/> 
          <label className="form-label">Nome Fantasia</label>
          <input size={34} className="form-input" type="text" id="nome_fantasia" defaultValue={editedCustommer?.nome_fantasia} onInput={evt => updateInputValue(evt)}/> 
          
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{paddingLeft: '0px'}}>
              <label className="form-label">CNPJ</label>
              <input size={16} className="form-input" type="text" id="cnpj" defaultValue={editedCustommer?.cnpj} onInput={evt => updateInputValue(evt)}/> 
            </div>
            <div>
              <label className="form-label">Contatos</label>
              <input size={14} className="form-input" type="text" id="contato" defaultValue={editedCustommer?.contato} onInput={evt => updateInputValue(evt)}/> 
            </div>
          </div>

          <label className="form-label">Telefones</label>
          <input size={30} className="form-input" type="text" id="telefone" defaultValue={editedCustommer?.telefone} onInput={evt => updateInputValue(evt)}/> 
        </div>

        <div className="table-custommer-form">

          <h2 style={{textAlign: 'left'}}>Endereço</h2>

          <div style={{display: 'flex'}}>
            <div>
              <label className="form-label">Cidade</label>
              <input size={18} className="form-input" type="text" id="cidade" defaultValue={editedCustommer?.cidade} onInput={evt => updateInputValue(evt)}/> 
            </div>
            <div style={{paddingLeft: '10px'}}>
              <label className="form-label">UF</label>
              <input size={1} className="form-input" type="text" id="uf" defaultValue={editedCustommer?.uf} onInput={evt => updateInputValue(evt)}/> 
            </div>
          </div>

          <label className="form-label">Logradouro</label>
          <input size={32} className="form-input" type="text" id="rua" defaultValue={editedCustommer?.rua} onInput={evt => updateInputValue(evt)}/> 

          <div style={{display: 'flex'}}>
            <div>
              <label className="form-label">Nro.</label>
              <input size={5} className="form-input" type="text" id="nro" defaultValue={editedCustommer?.nro} onInput={evt => updateInputValue(evt)}/> 
            </div>
            <div style={{paddingLeft: '13px'}}>
              <label className="form-label">Bairro</label>
              <input size={23} className="form-input" type="text" id="bairro" defaultValue={editedCustommer?.bairro} onInput={evt => updateInputValue(evt)}/> 
            </div>
          </div>

          <label className="form-label">Email</label>
          <input size={32} className="form-input" type="text" id="email" defaultValue={editedCustommer?.email} onInput={evt => updateInputValue(evt)}/> 

        </div>
      </div>
    </div>
  </div>
  : navigate('/login')
  ) as any
}
    