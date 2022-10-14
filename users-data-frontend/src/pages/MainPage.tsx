import { useState, useEffect } from "react";
import { CustommerCard } from "../components/CustommerCard";

export function MainPage() {
  const [allCustommers, setAllCustommers] = useState([]);
  const [filteredCustommers, setFilteredCustommers] = useState([]);
  const [toPrintQueue, setToPrintQueue] = useState(Array<Number>);
  const [toPrintCustommers, setToPrintCustommers] = useState([]);
  const [printScreen, setPrintScreen] = useState(Boolean);
  

  useEffect(() => {
    setPrintScreen(false);
    fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(res => {setAllCustommers(res), setFilteredCustommers(res);})
    .catch(err => console.log(err));
  }, []);

  function handleToPrintQueue(custommerId:number) {
    if (toPrintQueue.length === 0) {
      setToPrintQueue([custommerId]);
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
    setStateSearch(value);
    const field:string = event.target.id;
    const filteredCus:[] = [];
    allCustommers.map(custommer => {
      const a:string = custommer[field];
      if (a?.toLowerCase().includes(value.toLowerCase())) {
        filteredCus.push(custommer);
      }
    })
    setFilteredCustommers(filteredCus);
  }

  return (
    printScreen ?
      <div> 
        { toPrintCustommers.map((custommer, i) => {
          return (
            <div key={`to-print-card-${i+1}`} id={`to-print-card-${i+1}`}>
              <div>{ CustommerCard(custommer) }</div>
            </div>
          )
          })
        }
      </div>
    : 
    <div className="MainPage">
      <h1>Main Page</h1>
      <button onClick={handlePrint}>Imprimir</button>
      <button>Adicionar Novo Cliente</button>
      {/*<SearchBar />*/}
      <div className="SearchBar" style={{display: 'block'}}>
        <h2>Buscar...</h2>
        <label style={{paddingRight: '5px', fontSize: '20px', display: 'block'}}>Contato</label>
        <input type="text" id="contato" onChange={evt => updateInputValue(evt)} /> 
        <label style={{paddingRight: '5px', fontSize: '20px', display: 'block'}}>N.Fantasia</label>
        <input type="text" id="nome_fantasia" onChange={evt => updateInputValue(evt)} /> 
        <label style={{paddingRight: '5px', fontSize: '20px', display: 'block'}}>R.Social</label>
        <input type="text" id="razao_social" onChange={evt => updateInputValue(evt)} /> 
        <label style={{paddingRight: '5px', fontSize: '20px', display: 'block'}}>Cidade</label>
        <input type="text" id="cidade" onChange={evt => updateInputValue(evt)} />
        <label style={{paddingRight: '5px', fontSize: '20px', display: 'block'}}>Estado</label>
        <input type="text" size={1} id="uf" onChange={evt => updateInputValue(evt)} />
      </div>
      { filteredCustommers.map(custommer => {
        let isChecked:boolean = false;
        if (toPrintQueue.includes(custommer['id'])) {
          isChecked = true;
        }
        return (
          <div key={`custummer-card-${custommer['id']}`}>
            <div id={`custommer['id']`}>{ CustommerCard(custommer) }</div>
            <div>
              <input type="checkbox" checked={isChecked} onChange={() => handleToPrintQueue(custommer['id'])}/>
              <label>marcar para impressão</label>
            </div>
          </div>
        )
        })
      }
      <button onClick={handlePrint}>imprimir</button>
    </div>
  )
}
    