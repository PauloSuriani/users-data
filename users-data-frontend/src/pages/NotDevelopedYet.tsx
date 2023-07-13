import { useState, useEffect } from "react";
import { CustommerCard } from "../components/CustommerCard";
import { useNavigate } from 'react-router-dom';
import { CustommerCardToPrint } from "../components/CustommerCardToPrint";
import { api_url } from "../../serverurl";


export function RoutePage() {
  const [allCustommers, setAllCustommers] = useState([]);
  const [filteredCustommers, setFilteredCustommers] = useState([]);
  const [toPrintQueue, setToPrintQueue] = useState(Array<Number>);
  const [toPrintCustommers, setToPrintCustommers] = useState([]);
  const [printScreen, setPrintScreen] = useState(Boolean);
  const [checkedState, setCheckedState] = useState(
    new Array(filteredCustommers.length).fill(false)
  );
  
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
        .then(() => { setIsAuthenticated(true); })
        .catch(() => navigate('/login'));
    };

  }, [navigate]);


  function handleToPrintQueue(custommerId: number) {

    if (toPrintQueue.length === 0) {
      const userId: Array<number> = [custommerId];
      setToPrintQueue(userId);
    } else {
      let newArray: Array<Number> = toPrintQueue;
      if (toPrintQueue.includes(custommerId)) {
        newArray = toPrintQueue.filter((elem) => elem !== custommerId);
        setToPrintQueue(newArray);
      } else {
        newArray.push(custommerId);
        setToPrintQueue(newArray);
      }
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
      const searchedTerm: string = custommer[field];
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


          <div className="div-svg-custommer-card-sm-combo-h1">

            <h1>
              <svg className="svg-nav-style-h1" onClick={() => { navigate('/') }} viewBox="0 0 20 20">
                <path d="M3.24,7.51c-0.146,0.142-0.146,0.381,0,0.523l5.199,5.193c0.234,0.238,0.633,0.064,0.633-0.262v-2.634c0.105-0.007,0.212-0.011,0.321-0.011c2.373,0,4.302,1.91,4.302,4.258c0,0.957-0.33,1.809-1.008,2.602c-0.259,0.307,0.084,0.762,0.451,0.572c2.336-1.195,3.73-3.408,3.73-5.924c0-3.741-3.103-6.783-6.916-6.783c-0.307,0-0.615,0.028-0.881,0.063V2.575c0-0.327-0.398-0.5-0.633-0.261L3.24,7.51 M4.027,7.771l4.301-4.3v2.073c0,0.232,0.21,0.409,0.441,0.366c0.298-0.056,0.746-0.123,1.184-0.123c3.402,0,6.172,2.709,6.172,6.041c0,1.695-0.718,3.24-1.979,4.352c0.193-0.51,0.293-1.045,0.293-1.602c0-2.76-2.266-5-5.046-5c-0.256,0-0.528,0.018-0.747,0.05C8.465,9.653,8.328,9.81,8.328,9.995v2.074L4.027,7.771z"></path>
              </svg>
              {`Desculpe: Esta funcionalidade está em desenvolvimento!`}
            </h1>
          </div>

          {/* SEARCH BAR  */}

          <label className="label-footer">Desenvolvido e mantido por paulosuriani@gmail.com</label>

        </div>
        : navigate('/login')
  ) as any
}
