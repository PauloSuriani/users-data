import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import  { api_url } from '../../serverurl';

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
  password?: string;
  seller_id?: number;
  role?: string;
}

export function NewCustommerForm() {
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [newCustommer, setNewCustommer] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = api_url();

  useEffect(() => {
    const storage = localStorage.getItem('user');

    if (!storage) return navigate('/login');
    // const { token } = storage;

    if (JSON.parse(storage).token) {
      const token:string = JSON.parse(storage).token;
      console.log('token em new custommer: ', token);

      fetch(`${BASE_URL}/login/validate`, {
        method: "GET",
        headers: {  'Authorization': token,'Content-Type': 'application/json', 'Acept': '*/*' }
      })
      .then(response => response.json())
      .then(() => setIsAuthenticated(true))
      .catch(() => navigate('/login'));
    };

  }, [navigate]);


  function handleAddBtnClick() {
    if (isAuthenticated) {
      let custommer:CustommerObject = newCustommer;
      custommer['role'] = 'custommer';
      custommer['password'] = '';
      custommer['seller_id'] = JSON.parse(localStorage.getItem('user') as string).id;
      setNewCustommer(custommer);
      console.log('prefetch newcustommer', newCustommer);
      fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
        body: JSON.stringify(newCustommer)
      })
      .then(res => {
        console.log(res);
        if(res.status == 201){
          setConfirmScreen(true);
        }
      })
      .catch(err => console.log(err));
    }
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
        <h1>Novo Cliente Cadastrado com Sucesso!</h1>
        <div className="div-svg-btn">
          <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/')}} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>

          <svg cursor={'pointer'} onClick={cleanInputs} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
          </svg>
        </div>
      </div>
    : isAuthenticated ?
    <div className="NewCustommerForm" >
      
      <h1 style={{textAlign: 'center'}}>Cadastrar Novo Cliente</h1>
      
      <div className="new-custommer-block">
        <div className="custommer-form">
          <div className="table-custommer-form">
            <h2 style={{textAlign: 'left', paddingTop: '0px'}}>Dados Pessoais</h2>
            <label className="form-label">Razão Social</label>
            <input className="form-input form-input-resp" size={34} type="text" id="razao_social" onChange={evt => updateInputValue(evt)}/> 
            <label className="form-label">Nome Fantasia</label>
            <input size={34} className="form-input" type="text" id="nome_fantasia" onChange={evt => updateInputValue(evt)}/> 
            
            <div className="contact-cnpj-div">
              <div style={{paddingLeft: '0px'}}>
                <label className="form-label">CNPJ</label>
                <input size={16} className="form-input" type="text" id="cnpj" onChange={evt => updateInputValue(evt)}/> 
              </div>
              <div>
                <label className="form-label">Contatos</label>
                <input size={14} className="form-input" type="text" id="contato" onChange={evt => updateInputValue(evt)}/> 
              </div>
            </div>

            <label className="form-label">Telefones</label>
                <input size={30} className="form-input" type="text" id="telefone" onChange={evt => updateInputValue(evt)}/> 

          </div>

          <div className="table-custommer-form">

            <h2 style={{textAlign: 'left'}}>Endereço</h2>

            <div style={{display: 'flex'}}>
              <div>
                <label className="form-label">Cidade</label>
                <input size={18} className="form-input" type="text" id="cidade" onChange={evt => updateInputValue(evt)}/> 
              </div>
              <div style={{paddingLeft: '10px'}}>
                <label className="form-label">UF</label>
                <input size={1} className="form-input" type="text" id="uf" onChange={evt => updateInputValue(evt)}/> 
              </div>
            </div>

            <label className="form-label">Logradouro</label>
            <input size={32} className="form-input" type="text" id="rua" onChange={evt => updateInputValue(evt)}/> 
          
            <div style={{display: 'flex'}}>
              <div>
                <label className="form-label">Nro.</label>
                <input size={5} className="form-input" type="text" id="nro" onChange={evt => updateInputValue(evt)}/> 
              </div>
              <div style={{paddingLeft: '13px'}}>
                <label className="form-label">Bairro</label>
                <input size={23} className="form-input" type="text" id="bairro" onChange={evt => updateInputValue(evt)}/> 
              </div>
            </div>

            <label className="form-label">Email</label>
            <input size={32} className="form-input" type="text" id="email" onChange={evt => updateInputValue(evt)}/> 
          
          </div>

        </div>
        
        <div className="div-svg-btn">

          <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/')}} viewBox="0 0 20 20">
						<path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
					</svg>
          
          <svg cursor={'pointer'} onClick={handleAddBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
          </svg>

        </div>

      </div>
    
    </div>
    : navigate('/login')
  ) as any
}
    