import { useState, useEffect } from "react";
import { CustommerCard } from "../components/CustommerCard";
import { useNavigate } from 'react-router-dom';
import { CustommerCardToPrint } from "../components/CustommerCardToPrint";


export function MainPage() {
  const [allCustommers, setAllCustommers] = useState([]);
  const [filteredCustommers, setFilteredCustommers] = useState([]);
  const [toPrintQueue, setToPrintQueue] = useState(Array<Number>);
  const [toPrintCustommers, setToPrintCustommers] = useState([]);
  const [printScreen, setPrintScreen] = useState(Boolean);
  const [checkedState, setCheckedState] = useState(
    new Array(filteredCustommers.length).fill(false)
    );
      
  const navigate = useNavigate();

  useEffect(() => {
    
    setPrintScreen(false);
    fetch('http://localhost:3000/user')
    .then(response => response.json())
    // .then(res => setAllCustommers(res.slice(0,10)))
    .then(res => {setAllCustommers(res), setFilteredCustommers(res);})
    .catch(err => console.log(err));

  }, []);

  function handleToPrintQueue(custommerId:number) {
    if (toPrintQueue.length === 0) {
      const userId:Array<number> = [custommerId];
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

  const handleOnChange = (position:number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  }

  function handlePrint() {
    // implementar modal para confirmação:
    // const printCustommers = allCustommers.filter((custommer) => toPrintQueue.includes(custommer['id']));
    const printCustommers:[] = [];
    filteredCustommers.map((custommer) => { 
      if (toPrintQueue.includes(custommer['id'])){
        printCustommers.push(custommer);
        printCustommers.push(custommer);
      }
    });
    setToPrintCustommers(printCustommers);
    setPrintScreen(true);
  };
  
  function updateInputValue(event:any) {
    const value:any = event.target.value;
    const field:string = event.target.id;
    const filteredCus:[] = [];
    allCustommers.map(custommer => {
      const a:string = custommer[field] + '';
      if (a?.toLowerCase().includes(value.toLowerCase())) {
        filteredCus.push(custommer);
      }
    })
    setFilteredCustommers(filteredCus);
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
        <h1>Clique na impressora para baixar o arquivo</h1>
      <div className="div-svg-impressao">
        <div>
          <div className="div-svg-btn">
            <svg cursor={'pointer'} className="svg-icon svg-nav-style" onClick={() => location.reload()} viewBox="0 0 20 20">
              <path d="M18.121,9.88l-7.832-7.836c-0.155-0.158-0.428-0.155-0.584,0L1.842,9.913c-0.262,0.263-0.073,0.705,0.292,0.705h2.069v7.042c0,0.227,0.187,0.414,0.414,0.414h3.725c0.228,0,0.414-0.188,0.414-0.414v-3.313h2.483v3.313c0,0.227,0.187,0.414,0.413,0.414h3.726c0.229,0,0.414-0.188,0.414-0.414v-7.042h2.068h0.004C18.331,10.617,18.389,10.146,18.121,9.88 M14.963,17.245h-2.896v-3.313c0-0.229-0.186-0.415-0.414-0.415H8.342c-0.228,0-0.414,0.187-0.414,0.415v3.313H5.032v-6.628h9.931V17.245z M3.133,9.79l6.864-6.868l6.867,6.868H3.133z"></path>
            </svg>
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <svg cursor={'pointer'} onClick={generateExcelFile} className="svg-impressao" viewBox="0 0 20 20">
              <path d="M17.453,12.691V7.723 M17.453,12.691V7.723 M1.719,12.691V7.723 M18.281,12.691V7.723 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M16.625,6.066h-1.449V3.168c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.187-0.414,0.414v2.898H3.375c-0.913,0-1.656,0.743-1.656,1.656v4.969c0,0.913,0.743,1.656,1.656,1.656h1.449v2.484c0,0.228,0.187,0.414,0.414,0.414h9.523c0.229,0,0.414-0.187,0.414-0.414v-2.484h1.449c0.912,0,1.656-0.743,1.656-1.656V7.723C18.281,6.81,17.537,6.066,16.625,6.066 M5.652,3.582h8.695v2.484H5.652V3.582zM14.348,16.418H5.652v-4.969h8.695V16.418z M17.453,12.691c0,0.458-0.371,0.828-0.828,0.828h-1.449v-2.484c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.186-0.414,0.414v2.484H3.375c-0.458,0-0.828-0.37-0.828-0.828V7.723c0-0.458,0.371-0.828,0.828-0.828h13.25c0.457,0,0.828,0.371,0.828,0.828V12.691z M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312M7.309,15.383h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,15.383,7.309,15.383 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555"></path>
            </svg>

            <h2>{`${toPrintQueue.length === 0 
            ? 'Nenhum cliente selecionado' 
            : toPrintQueue.length === 1 
            ? `${toPrintQueue.length} cliente selecionado`
            :`${toPrintQueue.length} clientes selecionados`}`}
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
        { toPrintCustommers.map((custommer) => CustommerCardToPrint(custommer))}
      </table>
      
    </div>
    :
    <div style={{backgroundColor: 'white',fontFamily: 'sans-serif'}} className="MainPage">

    
    <div className="div-svg-btn-fixed">

        <h2>{`${toPrintQueue.length === 0 
          ? '' 
          : toPrintQueue.length === 1 
          ? `${toPrintQueue.length} registro selecionado`
          :`${toPrintQueue.length} registros selecionados`}`}
        </h2>
        
        <svg cursor={'pointer'} onClick={handlePrint} className="svg-icon svg-nav-style" viewBox="0 0 20 20">
          <path d="M17.453,12.691V7.723 M17.453,12.691V7.723 M1.719,12.691V7.723 M18.281,12.691V7.723 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M16.625,6.066h-1.449V3.168c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.187-0.414,0.414v2.898H3.375c-0.913,0-1.656,0.743-1.656,1.656v4.969c0,0.913,0.743,1.656,1.656,1.656h1.449v2.484c0,0.228,0.187,0.414,0.414,0.414h9.523c0.229,0,0.414-0.187,0.414-0.414v-2.484h1.449c0.912,0,1.656-0.743,1.656-1.656V7.723C18.281,6.81,17.537,6.066,16.625,6.066 M5.652,3.582h8.695v2.484H5.652V3.582zM14.348,16.418H5.652v-4.969h8.695V16.418z M17.453,12.691c0,0.458-0.371,0.828-0.828,0.828h-1.449v-2.484c0-0.228-0.186-0.414-0.414-0.414H5.238c-0.228,0-0.414,0.186-0.414,0.414v2.484H3.375c-0.458,0-0.828-0.37-0.828-0.828V7.723c0-0.458,0.371-0.828,0.828-0.828h13.25c0.457,0,0.828,0.371,0.828,0.828V12.691z M7.309,13.312h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,13.312,7.309,13.312M7.309,15.383h5.383c0.229,0,0.414-0.187,0.414-0.414s-0.186-0.414-0.414-0.414H7.309c-0.228,0-0.414,0.187-0.414,0.414S7.081,15.383,7.309,15.383 M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484 M12.691,12.484H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,12.484,12.691,12.484M12.691,14.555H7.309c-0.228,0-0.414,0.187-0.414,0.414s0.187,0.414,0.414,0.414h5.383c0.229,0,0.414-0.187,0.414-0.414S12.92,14.555,12.691,14.555"></path>
        </svg>
        
        <svg cursor={'pointer'} onClick={() => { navigate('/newcustommer')}} className="svg-nav-style svg-icon" viewBox="0 0 20 20">
          <path d="M14.613,10c0,0.23-0.188,0.419-0.419,0.419H10.42v3.774c0,0.23-0.189,0.42-0.42,0.42s-0.419-0.189-0.419-0.42v-3.774H5.806c-0.23,0-0.419-0.189-0.419-0.419s0.189-0.419,0.419-0.419h3.775V5.806c0-0.23,0.189-0.419,0.419-0.419s0.42,0.189,0.42,0.419v3.775h3.774C14.425,9.581,14.613,9.77,14.613,10 M17.969,10c0,4.401-3.567,7.969-7.969,7.969c-4.402,0-7.969-3.567-7.969-7.969c0-4.402,3.567-7.969,7.969-7.969C14.401,2.031,17.969,5.598,17.969,10 M17.13,10c0-3.932-3.198-7.13-7.13-7.13S2.87,6.068,2.87,10c0,3.933,3.198,7.13,7.13,7.13S17.13,13.933,17.13,10"></path>
        </svg>

      </div>

      <div style={{paddingTop: '55px'}}>
        <h1>{`Selecione para Impressão`}</h1>
      </div>

                                  {/* SEARCH BAR  */}
      <div className="SearchBar" style={{display: 'block'}}>

        <div style={{display: 'flex'}}>
          <svg className="svg-big-style" viewBox="0 0 20 20">
            <path d="M18.125,15.804l-4.038-4.037c0.675-1.079,1.012-2.308,1.01-3.534C15.089,4.62,12.199,1.75,8.584,1.75C4.815,1.75,1.982,4.726,2,8.286c0.021,3.577,2.908,6.549,6.578,6.549c1.241,0,2.417-0.347,3.44-0.985l4.032,4.026c0.167,0.166,0.43,0.166,0.596,0l1.479-1.478C18.292,16.234,18.292,15.968,18.125,15.804 M8.578,13.99c-3.198,0-5.716-2.593-5.733-5.71c-0.017-3.084,2.438-5.686,5.74-5.686c3.197,0,5.625,2.493,5.64,5.624C14.242,11.548,11.621,13.99,8.578,13.99 M16.349,16.981l-3.637-3.635c0.131-0.11,0.721-0.695,0.876-0.884l3.642,3.639L16.349,16.981z"></path>
          </svg>
          <h2>{`${filteredCustommers.length === 0 
            ? 'Nenhum registro encontrado' 
            : filteredCustommers.length === allCustommers.length 
              ? `Total de ${filteredCustommers.length} registros, filtrar por...`
              :`Exibindo ${filteredCustommers.length} registros`}`}
          </h2>
        </div>
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
          <div style={{paddingLeft: '5px'}}>
            <label className="form-label">Nro.</label>
            <input className="form-input" type="text" size={2} id="id" onChange={evt => updateInputValue(evt)} />
          </div>
          <div  style={{paddingLeft: '5px'}}>
            <label className="form-label">Contato</label>
            <input className="form-input" type="text" size={15} id="contato" onChange={evt => updateInputValue(evt)} /> 
          </div>
          <div  style={{paddingLeft: '5px'}}>
            <label  className="form-label">N.Fantasia</label>
            <input className="form-input" type="text" size={18} id="nome_fantasia" onChange={evt => updateInputValue(evt)} /> 
          </div>
          <div  style={{paddingLeft: '5px'}}>
            <label  className="form-label">R.Social</label>
            <input className="form-input" type="text" size={18} id="razao_social" onChange={evt => updateInputValue(evt)} /> 
          </div> 
          <div  style={{paddingLeft: '5px'}}>
            <label  className="form-label">Cidade</label>
            <input className="form-input" type="text" size={16} id="cidade" onChange={evt => updateInputValue(evt)} />
          </div>
          <div style={{paddingLeft: '5px'}}>
            <label className="form-label">UF</label>
            <input className="form-input" type="text" size={1} id="uf" onChange={evt => updateInputValue(evt)} />
          </div>
        </div>
      </div>

                                  {/* ROLL DE CARDS POR CUSTOMMER:  */}
      <div className="custommer-card-roll">
        { filteredCustommers.map((custommer, index) => {
          return (
            <div id={`custommer['id']`} className="custommer-card-style" onClick={() => {handleToPrintQueue(custommer['id']); handleOnChange(index)}} key={`custummer-card-${custommer['id']}`}>
              { CustommerCard(custommer, toPrintQueue, navigate) }
            </div>
          )})
        }
      </div>

      <label className="label-footer">Desenvolvido e mantido por paulosuriani@gmail.com</label>

    </div>
  )
}
    