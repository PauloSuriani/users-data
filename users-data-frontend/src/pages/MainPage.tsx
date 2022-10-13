import { SearchBar } from "../components/SearchBar";
import { useState, useEffect } from "react";
import { CustommerCard } from "../components/CustommerCard";

export function MainPage() {
  const [allCustommers, setAllCustommers] = useState([]);
  const [toPrintQueue, setToPrintQueue] = useState(Array<Number>);
  const [toPrintCustommers, setToPrintCustommers] = useState([]);
  const [printScreen, setPrintScreen] = useState(Boolean);
  

  useEffect(() => {
    setPrintScreen(false);
    fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(res => setAllCustommers(res.slice(0,10)))
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
    allCustommers.map((custommer) => { if (toPrintQueue.includes(custommer['id'])){
      printCustommers.push(custommer);
      printCustommers.push(custommer);
    }});
    setToPrintCustommers(printCustommers);
    setPrintScreen(true);
  };

  return (
    !printScreen ?
    <div className="MainPage">
      <h1>Main Page</h1>
      <button onClick={handlePrint}>Imprimir</button>
      <button>Adicionar Novo Cliente</button>
      <SearchBar />
      { allCustommers.map(custommer => {
        return (
          <div key={`custummer-card-${custommer['id']}`}>
            <div id={custommer['id']}>{ CustommerCard(custommer) }</div>
            <div>
              <input type="checkbox" onChange={() => handleToPrintQueue(custommer['id'])}/>
              <label>marcar para impressão</label>
            </div>
          </div>
        )
        })
      }
      <button onClick={handlePrint}>imprimir</button>
    </div>
    : <div> 
      { toPrintCustommers.map((custommer, i) => {
        return (
          <div key={`custummer-card-${i}`}>
            <div>{ CustommerCard(custommer) }</div>
          </div>
        )
        })
      }
      </div>
  )
}
    