import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api_url } from '../../serverurl';

type ProductObject = {
  nome_produto?: string;
  tipo_produto?: string;
  valor_sugerido?: string;
  codigo?: string;
  seller_id?: number;
}

export function NewProduct() {
  const [confirmScreen, setConfirmScreen] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const BASE_URL = api_url();

  useEffect(() => {
    const storage = localStorage.getItem('user');

    if (!storage) return navigate('/login');
    // const { token } = storage;

    if (JSON.parse(storage).token) {
      const token: string = JSON.parse(storage).token;
      console.log('token em new custommer: ', token);

      fetch(`${BASE_URL}/login/validate`, {
        method: "GET",
        headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Acept': '*/*' }
      })
        .then(response => response.json())
        .then(() => setIsAuthenticated(true))
        .catch(() => navigate('/login'));
    };

  }, [navigate]);


  function handleAddBtnClick() {
    if (isAuthenticated) {
      let insertNewProductAux: ProductObject = newProduct;
      // insere o id de quem está cadastrando
      insertNewProductAux['seller_id'] = JSON.parse(localStorage.getItem('user') as string).id;
      setNewProduct(insertNewProductAux);

      console.log('prefetch handleAddBtnClick, estado newProduct', newProduct);

      fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
        body: JSON.stringify(newProduct)
      })
        .then(res => {
          console.log(res);
          if (res.status == 201) {
            setConfirmScreen(true);
          }
        })
        .catch(err => console.log(err));
    }
  }

  // idea: could it be simply a "refresh" command?
  function cleanInputs() {
    const clearFormInputAux: ProductObject = {};
    setNewProduct(clearFormInputAux);
    setConfirmScreen(false);
  }

  function updateStateWithInputValue(event: any) {
    let productAux: ProductObject = newProduct;
    const value: any = event.target.value;
    const field: string = event.target.id;
    if ('nome_produto' == field || 'tipo_produto' == field ||
      'valor_sugerido' == field || 'codigo' == field) {
      productAux[field] = value;
    }
    setNewProduct(productAux);
  }

  return (
    confirmScreen ?
      <div>
        <h1>Novo Produto Cadastrado com Sucesso!</h1>
        <div className="div-svg-btn">
          <svg cursor={'pointer'} onClick={() => { navigate('/products') }} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
            <path d="M17.638,6.181h-3.844C13.581,4.273,11.963,2.786,10,2.786c-1.962,0-3.581,1.487-3.793,3.395H2.362c-0.233,0-0.424,0.191-0.424,0.424v10.184c0,0.232,0.191,0.424,0.424,0.424h15.276c0.234,0,0.425-0.191,0.425-0.424V6.605C18.062,6.372,17.872,6.181,17.638,6.181 M13.395,9.151c0.234,0,0.425,0.191,0.425,0.424S13.629,10,13.395,10c-0.232,0-0.424-0.191-0.424-0.424S13.162,9.151,13.395,9.151 M10,3.635c1.493,0,2.729,1.109,2.936,2.546H7.064C7.271,4.744,8.506,3.635,10,3.635 M6.605,9.151c0.233,0,0.424,0.191,0.424,0.424S6.838,10,6.605,10c-0.233,0-0.424-0.191-0.424-0.424S6.372,9.151,6.605,9.151 M17.214,16.365H2.786V7.029h3.395v1.347C5.687,8.552,5.332,9.021,5.332,9.575c0,0.703,0.571,1.273,1.273,1.273c0.702,0,1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h5.941v1.347c-0.495,0.176-0.849,0.645-0.849,1.199c0,0.703,0.57,1.273,1.272,1.273s1.273-0.57,1.273-1.273c0-0.554-0.354-1.023-0.849-1.199V7.029h3.395V16.365z"></path>
          </svg>

          <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/') }} viewBox="0 0 20 20">
            <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
          </svg>

          <svg cursor={'pointer'} onClick={cleanInputs} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
            <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
          </svg>
        </div>
      </div>
      : isAuthenticated ?
        <div className="NewCustommerForm" >

          <h1 style={{ textAlign: 'center' }}>Cadastrar Novo Produto</h1>

          <div className="new-custommer-block">
            <div className="custommer-form">
              <div className="table-custommer-form">
                <h2 style={{ textAlign: 'left', paddingTop: '0px' }}>Descrição</h2>
                <label className="form-label">Nome do Produto</label>
                <input className="form-input form-input-resp" size={34} type="text" id="nome_produto" onChange={evt => updateStateWithInputValue(evt)} />
                <label className="form-label">Tipo de Produto</label>
                <input size={34} className="form-input" type="text" id="tipo_produto" onChange={evt => updateStateWithInputValue(evt)} />

                <div className="contact-cnpj-div">
                  <div style={{ paddingLeft: '0px' }}>
                    <label className="form-label">Código</label>
                    <input size={16} className="form-input" type="text" id="codigo" onChange={evt => updateStateWithInputValue(evt)} />
                  </div>
                  <div>
                    <label className="form-label">Valor Sugerido</label>
                    <input size={14} className="form-input" type="text" id="valor_sugerido" onChange={evt => updateStateWithInputValue(evt)} />
                  </div>
                </div>

              </div>

            </div>

            <div className="div-svg-btn">

              <svg cursor={'pointer'} onClick={handleAddBtnClick} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
                <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
              </svg>

              <svg cursor={'pointer'} onClick={() => { navigate('/products') }} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
                <path d="M17.671,13.945l0.003,0.002l1.708-7.687l-0.008-0.002c0.008-0.033,0.021-0.065,0.021-0.102c0-0.236-0.191-0.428-0.427-0.428H5.276L4.67,3.472L4.665,3.473c-0.053-0.175-0.21-0.306-0.403-0.306H1.032c-0.236,0-0.427,0.191-0.427,0.427c0,0.236,0.191,0.428,0.427,0.428h2.902l2.667,9.945l0,0c0.037,0.119,0.125,0.217,0.239,0.268c-0.16,0.26-0.257,0.562-0.257,0.891c0,0.943,0.765,1.707,1.708,1.707S10,16.068,10,15.125c0-0.312-0.09-0.602-0.237-0.855h4.744c-0.146,0.254-0.237,0.543-0.237,0.855c0,0.943,0.766,1.707,1.708,1.707c0.944,0,1.709-0.764,1.709-1.707c0-0.328-0.097-0.631-0.257-0.891C17.55,14.182,17.639,14.074,17.671,13.945 M15.934,6.583h2.502l-0.38,1.709h-2.312L15.934,6.583zM5.505,6.583h2.832l0.189,1.709H5.963L5.505,6.583z M6.65,10.854L6.192,9.146h2.429l0.19,1.708H6.65z M6.879,11.707h2.027l0.189,1.709H7.338L6.879,11.707z M8.292,15.979c-0.472,0-0.854-0.383-0.854-0.854c0-0.473,0.382-0.855,0.854-0.855s0.854,0.383,0.854,0.855C9.146,15.596,8.763,15.979,8.292,15.979 M11.708,13.416H9.955l-0.189-1.709h1.943V13.416z M11.708,10.854H9.67L9.48,9.146h2.228V10.854z M11.708,8.292H9.386l-0.19-1.709h2.512V8.292z M14.315,13.416h-1.753v-1.709h1.942L14.315,13.416zM14.6,10.854h-2.037V9.146h2.227L14.6,10.854z M14.884,8.292h-2.321V6.583h2.512L14.884,8.292z M15.978,15.979c-0.471,0-0.854-0.383-0.854-0.854c0-0.473,0.383-0.855,0.854-0.855c0.473,0,0.854,0.383,0.854,0.855C16.832,15.596,16.45,15.979,15.978,15.979 M16.917,13.416h-1.743l0.189-1.709h1.934L16.917,13.416z M15.458,10.854l0.19-1.708h2.218l-0.38,1.708H15.458z"></path>
              </svg>

              <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => { navigate('/') }} viewBox="0 0 20 20">
                <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
              </svg>

            </div>

          </div>

        </div>
        : navigate('/login')
  ) as any
}
