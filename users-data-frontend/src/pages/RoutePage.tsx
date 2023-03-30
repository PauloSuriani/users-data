import { useState, useEffect } from "react";
import { RouteCard } from "../components/RouteCard";
import { useNavigate } from 'react-router-dom';
import { api_url } from "../../serverurl";

type RouteProps = {
  ID: number;
  CONTATO: number;
  NOME_ROTA: string;
  DATA_INICIAL: string;
  DATA_FINAL?: string;
  VALOR_TOTAL?: number;
}

type FlexDirection = "column" | "column-reverse";
type Route = 'ID' | 'CONTATO' | 'NOME_ROTA' | 'DATA_INICIAL' | 'DATA_FINAL' | 'VALOR_TOTAL';


export function RoutePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allRoutes, setAllRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [listOrderInverter, setListOrderInverter] = useState<FlexDirection>('column-reverse')
  const [svgRotate, setSvgRotate] = useState(
    {
      ID: 'rotate(0deg)',
      CONTATO: 'rotate(0deg)',
      NOME_ROTA: 'rotate(0deg)',
      DATA_INICIAL: 'rotate(0deg)',
      DATA_FINAL: 'rotate(0deg)',
      VALOR_TOTAL: 'rotate(0deg)'
    });

  const navigate = useNavigate();
  const BASE_URL = api_url();

  useEffect(() => {
    const storage = localStorage.getItem('user');

    if (!storage) return navigate('/login');

    if (JSON.parse(storage).token) {

      const token: string = JSON.parse(storage).token;
      console.log('tokem: ', token);

      fetch(`${BASE_URL}/login/validate`, {
        method: "GET",
        headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Acept': '*/*' }
      })
        .then(response => response.json())
        .then(() => { setIsAuthenticated(true); fillRoutesByManager(JSON.parse(storage).id); })
        .catch(() => navigate('/login'));
    };

  }, [navigate]);

  function fillRoutesByManager(sellerId: number) {
    // setPrintScreen(false);
    const fetchUrl: string = `${BASE_URL}/route/${sellerId}`;
    fetch(fetchUrl)
      .then(response => response.json())
      .then(res => { setAllRoutes(res), setFilteredRoutes(res); })
      .catch(err => console.log(err));
  };


  function updateInputValue(event: any) {
    const value: any = event.target.value;
    const field: string = event.target.id;
    const filteredRouteAux: [] = [];
    allRoutes.map(route => {
      const searchedTerm: string = `${route[field]}`;
      if (searchedTerm?.toLowerCase().includes(value.toLowerCase())) {
        filteredRouteAux.push(route);
      }
    })
    setFilteredRoutes(filteredRouteAux);
  }


  function resetSvgRotation() {
    setSvgRotate({
      ID: 'rotate(0deg)',
      NOME_ROTA: 'rotate(0deg)',
      CONTATO: 'rotate(0deg)',
      DATA_INICIAL: 'rotate(0deg)',
      DATA_FINAL: 'rotate(0deg)',
      VALOR_TOTAL: 'rotate(0deg)'
    });
  }

  function setOrderedStates(orderedRoutes: [] | never[], field: Route) {
    setFilteredRoutes(orderedRoutes);
    setListOrderInverter('column');
    resetSvgRotation();
    setSvgRotate(prevState => ({
      ...prevState,
      [field]: 'rotate(180deg)'
    }));
  }

  function setRollOrder(event: any) {
    const field: Route = event.target.id;
    const filteredRoutesAux = filteredRoutes;

    if (svgRotate[field] === 'rotate(180deg)') {
      setListOrderInverter('column-reverse');
      resetSvgRotation();
    } else if (field === 'VALOR_TOTAL' || field === 'ID') {

      filteredRoutesAux.sort((x: any, y: any) => {
        let a: number = parseFloat(x[field] ? x[field] : 0);
        let b: number = parseFloat(y[field] ? y[field] : 0);

        return a - b;
      });
      setOrderedStates(filteredRoutesAux, field);

    } else {

      filteredRoutesAux.sort((x: any, y: any) => {
        let a = x[field] ? x[field].toUpperCase() : 'a';
        let b = y[field] ? y[field].toUpperCase() : 'a';

        return a == b ? 0 : a! > b! ? 1 : -1;
      });
      setOrderedStates(filteredRoutesAux, field);

    }
    // https://ricardo-reis.medium.com/o-m%C3%A9todo-sort-do-array-javascript-482576734e0a
  }

  return (

    isAuthenticated ?
      <div style={{ backgroundColor: 'white', fontFamily: 'monospace' }} className="RoutePage">

        <div className="div-svg-btn-fixed">

          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 svg-nav-style" onClick={() => { navigate('/rotas/nova') }} fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 svg-nav-style" fill="none" onClick={() => { navigate('/') }} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>

          <svg cursor={'pointer'} onClick={() => { navigate('/products') }} style={{ marginRight: '11px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="svg-nav-style w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>

        </div>

        {/* DIV PARA RECUO E AJUSTE DO MENU ''TO FIXED'' */}
        <div className="div-svg-custommer-card-sm-combo-h1" />

        {/* SEARCH BAR  */}
        <div className="SearchBar" style={{ display: 'block' }}>

          <div style={{ display: 'flex' }}>
            <svg className="svg-big-style" viewBox="0 0 20 20">
              <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
            </svg>
            <h2>{`${filteredRoutes.length === 0
              ? 'Nenhum registro encontrado'
              : filteredRoutes.length === allRoutes.length
                ? `Total de ${filteredRoutes.length} rotas`
                : `Exibindo ${filteredRoutes.length} rotas`}`}
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Nro.</label>
              <input className="form-input" type="text" size={5} id="ID" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Nome da Rota</label>
              <input className="form-input" type="text" size={20} id="NOME_ROTA" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Vendedor</label>
              <input className="form-input" type="text" size={15} id="CONTATO" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Data Inicial</label>
              <input className="form-input" type="date" size={18} id="DATA_INICIAL" onChange={evt => updateInputValue(evt)} />
            </div>
            <div style={{ paddingLeft: '5px' }}>
              <label className="form-label">Data Final</label>
              <input className="form-input" type="date" size={18} id="DATA_FINAL" onChange={evt => updateInputValue(evt)} />
            </div>
          </div>
        </div>

        {/* CABEÇALHO DA LISTA:  */}
        <div className="product-card-roll-header" key={`product-roll-header`}>
          {/* <button onClick={evt => setRollOrder()}>Clique-me</button> */}
          <div className="product-card-roll-header-label" style={{ marginLeft: '0px' }}>
            Nro.
            <svg id="ID" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['ID'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </div>
          <div className="product-card-roll-header-label" style={{ minWidth: '300px' }}>
            Nome da Rota
            <svg id="NOME_ROTA" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['NOME_ROTA'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </div>
          <div className="product-card-roll-header-label" style={{ minWidth: '140px', marginRight: '40px' }}>
            Vendedor
            <svg id="CONTATO" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['CONTATO'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </div>
          <div className="product-card-roll-header-label" style={{ minWidth: '30px' }}>
            Data Inicial
            <svg id="DATA_INICIAL" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['DATA_INICIAL'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </div>
          <div className="product-card-roll-header-label" style={{ marginLeft: '-30px' }}>
            Data Final
            <svg id="DATA_FINAL" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['DATA_FINAL'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </div>
          <div className="product-card-roll-header-label" style={{ paddingRight: '40px' }}>
            Total (R$)
            <svg id="VALOR_TOTAL" onClick={evt => setRollOrder(evt)} style={{ transform: svgRotate['VALOR_TOTAL'] }} className="svg-icon svg-mini-button" viewBox="0 0 20 20">
              <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
            </svg>
          </div>
        </div>

        {/* ROLL DE CARDS DAS ROTAS:  */}
        <div className="custommer-card-roll" style={{ flexDirection: listOrderInverter }}>
          {filteredRoutes.map((route, index) => {
            return (
              <div id={`route-card-${route['ID']}`} className="product-card-style" onClick={() => { }} key={`route-card-${route['ID']}`}>
                {RouteCard(route, navigate)}
              </div>
            )
          })
          }
        </div>

        <label className="label-footer">Desenvolvido e mantido por paulosuriani@gmail.com</label>

      </div>
      : navigate('/login')
  ) as any
}
