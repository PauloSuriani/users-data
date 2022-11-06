import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
        <h1>Cliente Alterado com Sucesso!</h1>
        <div className="div-svg-btn">
          <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/')}} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>

          <svg cursor={'pointer'} onClick={() => { navigate('/newcustommer')}} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
          </svg>

        </div>

      </div>
    : 
    <div className="NewCustommerForm">
      <h1>{`Editar Cliente Nro.Registro: ${custommerId}`}</h1>
      
      <div className="new-custommer-block">
        {/* <div className="rectangle"/> */}
        <div className="div-svg-btn">
          <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/')}} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>

          <svg cursor={'pointer'} onClick={handleUpdateBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
            <path d="M17.064,4.656l-2.05-2.035C14.936,2.544,14.831,2.5,14.721,2.5H3.854c-0.229,0-0.417,0.188-0.417,0.417v14.167c0,0.229,0.188,0.417,0.417,0.417h12.917c0.229,0,0.416-0.188,0.416-0.417V4.952C17.188,4.84,17.144,4.733,17.064,4.656M6.354,3.333h7.917V10H6.354V3.333z M16.354,16.667H4.271V3.333h1.25v7.083c0,0.229,0.188,0.417,0.417,0.417h8.75c0.229,0,0.416-0.188,0.416-0.417V3.886l1.25,1.239V16.667z M13.402,4.688v3.958c0,0.229-0.186,0.417-0.417,0.417c-0.229,0-0.417-0.188-0.417-0.417V4.688c0-0.229,0.188-0.417,0.417-0.417C13.217,4.271,13.402,4.458,13.402,4.688"></path>
          </svg>

          <svg cursor={'pointer'} onClick={handleDeleteBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
            <path d="M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306"></path>
          </svg>
        </div>

        <div className="custommer-form">
          <div className="table-custommer-form">
            <h2 style={{textAlign: 'left', paddingTop: '0px'}}>Dados Pessoais</h2>
            <label className="form-label">Razão Social</label>
            <input className="form-input" size={36} type="text" id="razao_social" defaultValue={editedCustommer?.razao_social} onInput={evt => updateInputValue(evt)}/> 
            <label className="form-label">Nome Fantasia</label>
            <input size={36} className="form-input" type="text" id="nome_fantasia" defaultValue={editedCustommer?.nome_fantasia} onInput={evt => updateInputValue(evt)}/> 
            
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <div style={{paddingLeft: '0px'}}>
                <label className="form-label">CNPJ</label>
                <input size={14} className="form-input" type="text" id="cnpj" defaultValue={editedCustommer?.cnpj} onInput={evt => updateInputValue(evt)}/> 
              </div>
              <div>
                <label className="form-label">Contatos</label>
                <input size={17} className="form-input" type="text" id="contato" defaultValue={editedCustommer?.contato} onInput={evt => updateInputValue(evt)}/> 
              </div>
            </div>

            <label className="form-label">Telefones</label>
                <input size={24} className="form-input" type="text" id="telefone" defaultValue={editedCustommer?.telefone} onInput={evt => updateInputValue(evt)}/> 
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
            <input size={28} className="form-input" type="text" id="rua" defaultValue={editedCustommer?.rua} onInput={evt => updateInputValue(evt)}/> 

            <div style={{display: 'flex'}}>
              <div>
                <label className="form-label">Nro.</label>
                <input size={5} className="form-input" type="text" id="nro" defaultValue={editedCustommer?.nro} onInput={evt => updateInputValue(evt)}/> 
              </div>
              <div style={{paddingLeft: '17px'}}>
                <label className="form-label">Bairro</label>
                <input size={18} className="form-input" type="text" id="bairro" defaultValue={editedCustommer?.bairro} onInput={evt => updateInputValue(evt)}/> 
              </div>
            </div>

            <label className="form-label">Email</label>
            <input size={36} className="form-input" type="text" id="email" defaultValue={editedCustommer?.email} onInput={evt => updateInputValue(evt)}/> 

          </div>
        </div>
      </div>
    </div>
  )
}
    