import { useState, useEffect } from "react";
import { ShortCustommerCard } from "../components/ShortCustomCard";
import { useNavigate } from 'react-router-dom';
import { CustommerCardToPrint } from "../components/CustommerCardToPrint";
import { api_url } from "../../serverurl";

export function NewRoutePage() {
  const [newRoute, setNewRoute] = useState({});
  const [allCustommers, setAllCustommers] = useState([]);
  const [fieldSellers, setFieldSellers] = useState(Array<DropDownOption>);
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredCustommers, setFilteredCustommers] = useState([]);
  const [toPrintQueue, setToPrintQueue] = useState(Array<Number>);
  const [toPrintCustommers, setToPrintCustommers] = useState([]);
  const [printScreen, setPrintScreen] = useState(Boolean);
  const [checkedState, setCheckedState] = useState(
    new Array(filteredCustommers.length).fill(false)
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  type DropDownOption = { "id": number, "nome": string };

  const navigate = useNavigate();

  const BASE_URL = api_url();

  useEffect(() => {
    const storage = localStorage.getItem('user');

    if (!storage) return navigate('/login');
    // const { token } = storage;

    if (JSON.parse(storage).token) {
      setPrintScreen(false);

      const token: string = JSON.parse(storage).token;
      console.log('tokem: ', token);

      fetch(`${BASE_URL}/login/validate`, {
        method: "GET",
        headers: { 'Authorization': token, 'Content-Type': 'application/json', 'Acept': '*/*' }
      })
        .then(response => response.json())
        .then(() => { setIsAuthenticated(true); fillDataBySeller(JSON.parse(storage).id); })
        .catch(() => navigate('/login'));
    };

  }, [navigate]);

  function fillDataBySeller(sellerId: number) {
    // setPrintScreen(false);
    setNewRoute({
      ...newRoute,
      'id_seller': sellerId
    });

    const fetchUrlCustommers: string = `${BASE_URL}/custommer/${sellerId}`;
    fetch(fetchUrlCustommers)
      .then(response => response.json())
      .then(res => { setAllCustommers(res), setFilteredCustommers(res); })
      .catch(err => console.log(err));

    const fetchUrlFieldSellers: string = `${BASE_URL}/fieldseller/${sellerId}`;
    fetch(fetchUrlFieldSellers)
      .then(response => response.json())
      .then(res => { generateDropDownOptions(res) })
      .catch(err => console.log(err));

    // generateDropDownOptions();
  };


  function generateDropDownOptions(rawFieldSellers: []) {
    const dropDownAux: DropDownOption[] = [];
    rawFieldSellers.map(fieldSeller => {
      dropDownAux.push({ "id": fieldSeller['id'], "nome": fieldSeller['contato'] });
    })
    setFieldSellers(dropDownAux);
  }


  function handleToPrintQueue(custommerId: number) {

    if (toPrintQueue.length === 0) {
      const userId: Array<number> = [custommerId];
      setToPrintQueue(userId);
      setNewRoute({
        ...newRoute,
        'clients': userId
      });
    } else {
      let newArray: Array<Number> = toPrintQueue;
      if (toPrintQueue.includes(custommerId)) {
        newArray = toPrintQueue.filter((elem) => elem !== custommerId);
        setToPrintQueue(newArray);
      } else {
        newArray.push(custommerId);
        setToPrintQueue(newArray);
      }
      setNewRoute({
        ...newRoute,
        'clients': newArray
      });
    }

  };

  const handleOnChange = (position: number) => {

    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

  }

  function handlePrint() {
    // implementar modal para confirmação:
    // const printCustommers = allCustommers.filter((custommer) => toPrintQueue.includes(custommer['id']));
    const printCustommers: [] = [];
    allCustommers.map((custommer) => {
      if (toPrintQueue.includes(custommer['id'])) {
        printCustommers.push(custommer);
        printCustommers.push(custommer);
      }
    });
    setToPrintCustommers(printCustommers);
    setPrintScreen(true);
  };

  function updateInputValue(event: any) {
    const value: any = event.target.value;
    const field: string = event.target.id;
    const filteredCustommerAux: [] = [];
    allCustommers.map(custommer => {
      // const searchedTerm: string = custommer[field];
      const searchedTerm: string = `${custommer[field]}`
      if (searchedTerm?.toLowerCase().includes(value.toLowerCase())) {
        filteredCustommerAux.push(custommer);
      }
    })
    setFilteredCustommers(filteredCustommerAux);
  }

  function generateExcelFile() {
    const script = document.createElement('script');
    script.textContent = `var table2excel = new Table2Excel();
    table2excel.export(document.querySelectorAll("#stamps-to-print-table"));`;

    script.async = true;

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }

  const handleDropDownChange = (event: any) => {
    setSelectedOption(event.target.value);
    setNewRoute({
      ...newRoute,
      'id_field_seller': event.target.value
    })
  }

  type Route = {
    "id_seller"?: String,
    "id_field_seller"?: String,
    "nome_rota"?: String,
    "data_inicial"?: Date,
    "clients"?: number[]
  }

  function updateStateWithInputValue(event: any) {
    let routeAux: Route = newRoute;
    const value: any = event.target.value;
    const field: string = event.target.id;
    if ('nome_rota' == field || 'data_inicial' == field) {
      routeAux[field] = value;
    }
    setNewRoute(routeAux);
  }

  function handleAddBtnClick() {
    if (isAuthenticated) {
      // let insertNewRouteAux = {
      //   "id_field_seller": String,
      //   "nome_rota": String,
      //   "data_inicial": Date
      // };
      // insere o id de quem está cadastrando
      // insertNewRouteAux['id_seller'] = JSON.parse(localStorage.getItem('user') as string).id;
      // setNewProduct(insertNewProductAux);

      // setNewRoute({
      //   ...newRoute,
      //   'id_seller': JSON.parse(localStorage.getItem('user') as string).id,
      //   'clients': toPrintQueue
      // })


      console.log('prefetch handleAddBtnClick, estado newRoute', newRoute);

      fetch(`${BASE_URL}/route`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json', 'Acept': '*/*' },
        body: JSON.stringify(newRoute)
      })
        .then(res => {
          console.log(res);
          if (res.status == 201) {
            // setConfirmScreen(true);
          }
        })
        .catch(err => console.log(err));
    }
  }

  return (
    printScreen ?
      <div>
        <h1>Gerar arquivo</h1>
        <div className="div-svg-impressao">
          <div>
            <div className="div-svg-btn">
              <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => location.reload()} viewBox="0 0 20 20">
                <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <svg cursor={'pointer'} onClick={generateExcelFile} className="svg-impressao" viewBox="0 0 20 20">
                <path d="M17.453,12.691V7.723 M17.453,12.691V7.723 M1.719,12.691V7.723 M18.281,12.691V7.723 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M16.625,6.066h-1.449V3.168c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.187-0.414,0.414v2.898H3.375c-0.913,0-1.656,0.743-1.656,1.656v4.969c0,0.913,0.743,1.656,1.656,1.656h1.449v2.484c0,0.228,0.187,0.414,0.414,0.414h9.523c0.229,0,0.414-0.187,0.414-0.414v-2.484h1.449c0.912,0,1.656-0.743,1.656-1.656V7.723C18.281,6.81,17.537,6.066,16.625,6.066 M5.652,3.582h8.695v2.484H5.652V3.582zM14.348,16.418H5.652v-4.969h8.695V16.418z M17.453,12.691c0,0.458-0.371,0.828-0.828,0.828h-1.449v-2.484c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.186-0.414,0.414v2.484H3.375c-0.458,0-0.828-0.37-0.828-0.828V7.723c0-0.458,0.371-0.828,0.828-0.828h13.25c0.457,0,0.828,0.371,0.828,0.828V12.691z M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312M7.309,15.383h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,15.383,7.309,15.383 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555"></path>
              </svg>

              <h2>{`${toPrintQueue.length === 0
                ? 'Nenhum cliente selecionado'
                : toPrintQueue.length === 1
                  ? `${toPrintQueue.length} cliente selecionado`
                  : `${toPrintQueue.length} clientes selecionados`}`}
              </h2>
            </div>
          </div>
        </div>
        <table id="stamps-to-print-table">
          <tr>
            <th>Razão Social</th>
            <th>Nome Fantasia</th>
            <th>Município</th>
            <th>Endereço</th>
            <th>Contato</th>
            <th>Registro Nro.</th>
            <th>Email</th>
            <th>CNPJ</th>
          </tr>
          {toPrintCustommers.map((custommer) => CustommerCardToPrint(custommer))}
        </table>

      </div>
      : isAuthenticated ?
        <div style={{ backgroundColor: 'white', fontFamily: 'monospace' }} className="MainPage">

          <div className="div-svg-btn-fixed">

            <h2>{`${toPrintQueue.length === 0
              ? ''
              : toPrintQueue.length === 1
                ? `${toPrintQueue.length} selecionado`
                : `${toPrintQueue.length} selecionados`}`}
            </h2>

            <svg onClick={handleAddBtnClick} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="svg-nav-style">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>


            <svg onClick={() => { navigate('/') }} xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 svg-nav-style" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            <svg onClick={() => { navigate('/products') }} style={{ marginRight: '11px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="svg-nav-style w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

          </div>

          <div className="div-svg-custommer-card-sm-combo-h1">
            <h1>
              <svg className="svg-nav-style-h1" onClick={() => { navigate('/rotas') }} viewBox="0 0 20 20">
                <path d="M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z"></path>
              </svg>
              {`Adicionar Nova Rota`}
            </h1>
          </div>

          {/* NEW ROUTE FORM & SEARCH BAR  */}
          <div className="SearchBar" style={{ display: 'block' }}>

            <div className="route-form">
              <div className="table-route-form">
                <h2 style={{ textAlign: 'left', marginTop: '-4px' }}>Informações Gerais</h2>
                <div className="contact-cnpj-div">
                  {/* <div> */}
                  <label className="form-label">Nome da Rota</label>
                  <input className="form-input form-input-resp" size={24} type="text" id="nome_rota" onChange={evt => updateStateWithInputValue(evt)} />
                  <label style={{ paddingLeft: '18px' }} className="form-label">Vendedor</label>

                  <select className="form-input" value={selectedOption} onChange={handleDropDownChange}>
                    <option value="">(selecione)</option>
                    {fieldSellers.map((elem) => {
                      return <option id="id_field_seller" value={`${elem['id']}`}>{elem['nome']}</option>
                    })}
                  </select>
                  < label style={{ paddingLeft: '18px' }} className="form-label">Data Prev. Início</label>
                  <input className="form-input" type="date" id="data_inicial" onChange={evt => updateStateWithInputValue(evt)} />
                  {/* </div> */}
                </div>

              </div>

            </div>

            <div style={{ display: 'flex', paddingTop: '12px' }}>
              <svg className="svg-big-style" viewBox="0 0 20 20">
                <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
              </svg>
              <h2>{`${filteredCustommers.length === 0
                ? 'Nenhum registro encontrado'
                : filteredCustommers.length === allCustommers.length
                  ? `Total de ${filteredCustommers.length} clientes`
                  : `Exibindo ${filteredCustommers.length} clientes`}`}
              </h2>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <div style={{ paddingLeft: '5px' }}>
                <label className="form-label">Nro.</label>
                <input className="form-input" type="text" size={2} id="id" onChange={evt => updateInputValue(evt)} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <label className="form-label">Contato</label>
                <input className="form-input" type="text" size={15} id="contato" onChange={evt => updateInputValue(evt)} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <label className="form-label">N.Fantasia</label>
                <input className="form-input" type="text" size={18} id="nome_fantasia" onChange={evt => updateInputValue(evt)} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <label className="form-label">R.Social</label>
                <input className="form-input" type="text" size={18} id="razao_social" onChange={evt => updateInputValue(evt)} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <label className="form-label">Cidade</label>
                <input className="form-input" type="text" size={16} id="cidade" onChange={evt => updateInputValue(evt)} />
              </div>
              <div style={{ paddingLeft: '5px' }}>
                <label className="form-label">UF</label>
                <input className="form-input" type="text" size={1} id="uf" onChange={evt => updateInputValue(evt)} />
              </div>
            </div>
          </div>

          {/* ROLL DE CARDS POR CUSTOMMER:  */}
          <div className="custommer-card-roll">
            {filteredCustommers.map((custommer, index) => {
              return (
                <div id={`custommer['id']`} className="short-custommer-card-style" onClick={() => { handleToPrintQueue(custommer['id']); handleOnChange(index) }} key={`custummer-card-${custommer['id']}`}>
                  {ShortCustommerCard(custommer, toPrintQueue, navigate)}
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

