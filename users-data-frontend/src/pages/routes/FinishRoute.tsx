import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { api_url } from "../../../serverurl";

type Route = {
  "idSeller"?: number,
  "idRoute"?: number,
  "contato"?: string,
  "nomeRota"?: string,
  "dataInicial"?: string,
  "dataFinal"?: string,
  "valorTotal"?: number,
  "idFieldSeller"?: number,
  "clients"?: Number[]
}

export function FinishRoutePage() {
  const [toPrintQueue, setToPrintQueue] = useState(Array<Number>);
  const [editedRoute, setEditedRoute] = useState<Route>();
  const [printScreen, setPrintScreen] = useState(Boolean);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const BASE_URL = api_url();

  useEffect(() => {
    const storage = localStorage.getItem('user');

    if (!storage) return navigate('/login');

    if (JSON.parse(storage).token) {
      setPrintScreen(false);

      const token: string = JSON.parse(storage).token;
      console.log('tokem: ', token);

      fetch(`${BASE_URL}/login/validate`, {
        method: "GET",
        headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Acept': '*/*' }
      })
        .then(response => response.json())
        .then(() => { setIsAuthenticated(true); loadData(JSON.parse(storage).id); })
        .catch(() => navigate('/login'));
    };

  }, [navigate]);

  function loadData(sellerId: number) {
    // setPrintScreen(false);
    const routeId = getIdByParams();

    const fetchUrlSelectedCustommersId: string = `${BASE_URL}/routedata/${routeId}`;
    fetch(fetchUrlSelectedCustommersId)
      .then(response => response.json())
      .then(res => { setToPrintQueue(res['selectedCustommers']), preSetEditedRoute(res)})
      .catch(err => console.log(err));
  };

  function preSetEditedRoute(res: any) {
    setEditedRoute({
      ...res['route'],
      ['dataInicial']: res['route'].dataInicial?.toString().split('T')[0],
      ['dataFinal']: res['route'].dataFinal?.toString().split('T')[0]
    })
  }

  function getIdByParams() {
    const len: number = window.location.href.length;
    const url: string = window.location.href;
    let idAux: string = '';
    let sliced: string = url.slice(len - 1);
    idAux = idAux + sliced;
    sliced = url.slice(len - 2);
    if (!sliced.includes('/')) {
      idAux = sliced;
    }
    sliced = url.slice(len - 3);
    if (!sliced.includes('/')) {
      idAux = sliced;
    }
    sliced = url.slice(len - 4);
    if (!sliced.includes('/')) {
      idAux = sliced;
    }
    return idAux;
  }

  function updateStateWithInputValue(event: any) {
    let routeAux: Route = editedRoute as Route;
    const value: any = event.target.value;
    const field: string = event.target.id;
    if ('dataFinal' == field || 'valorTotal' == field) {
      routeAux[field] = value;
    }
    setEditedRoute(routeAux);
  }

  function handleAddBtnClick() {
    if (isAuthenticated) {
      const url = `${BASE_URL}/route/${editedRoute?.idRoute}`;

      console.log('prefetch handleAddBtnClick, estado editedRoute', editedRoute);

      fetch(url, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
        body: JSON.stringify(editedRoute)
      })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            // setConfirmScreen(true);
            setTimeout(() => {

              navigate('/rotas');
            }, 2000);
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    printScreen ?
      <div>
      </div>
      : isAuthenticated ?
        <div style={{ backgroundColor: 'white', fontFamily: 'monospace' }} className="MainPage">

          <div className="">
            <h1>
              <svg className="svg-nav-style-h1" onClick={() => { navigate('/rotas') }} cursor={'pointer'} viewBox="0 0 20 20">
                <path d="M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z"></path>
              </svg>

              {`Finalizar Rota Nro.: ${editedRoute?.idRoute}`}
            </h1>
          </div>

          {/* FINISH ROUTE FORM*/}
          <div className="custommer-card-roll" >

            <div className="route-form" style={{ display: 'block' }}>
              <div className="table-route-form">
                <h2 style={{ textAlign: 'left', marginTop: '4px' }}>Informações Gerais - {toPrintQueue.length} clientes nesta rota</h2>
                <div className="contact-cnpj-div">
                  <label className="form-label">Nome da Rota</label>
                  <input style={{ backgroundColor: 'lightgray', cursor: "default" }} className="form-input form-input-resp" readOnly size={28} defaultValue={editedRoute?.nomeRota} type="text" id="nomeRota" />
                  <label style={{ paddingLeft: '18px' }} className="form-label">Vendedor</label>
                  <input style={{ backgroundColor: 'lightgray', cursor: "default" }} className="form-input form-input-resp" readOnly size={18} defaultValue={editedRoute?.contato} type="text" id="contato" />
                </div>
                <div className="contact-cnpj-div" style={{ marginTop: '16px' }}>
                  <label className="form-label">Início</label>
                  <input className="form-input" style={{ backgroundColor: 'lightgray', cursor: "default" }} readOnly defaultValue={editedRoute?.dataInicial} type="date" id="dataInicial" onChange={evt => updateStateWithInputValue(evt)} />

                  <label style={{ paddingLeft: '12px' }} className="form-label">Fim</label>
                  <input className="form-input" defaultValue={editedRoute?.dataFinal} type="date" id="dataFinal" onChange={evt => updateStateWithInputValue(evt)} />

                  <label style={{ paddingLeft: '12px' }} className="form-label">Total(R$)</label>
                  <input className="form-input form-input-resp" size={12} defaultValue={editedRoute?.valorTotal} type="text" id="valorTotal" onChange={evt => updateStateWithInputValue(evt)} />

                </div>

              </div>
              <div className="route-form" style={{ marginTop: '20px' }}>

                <svg className="svg-nav-style" onClick={handleAddBtnClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

              </div>
            </div>

          </div>

          <label className="label-footer">Desenvolvido e mantido por paulosuriani@gmail.com</label>

        </div>
        : navigate('/login')
  ) as any
}

