import { SearchBar } from "../components/SearchBar";
import { useState, useEffect } from "react";

export function MainPage() {
  const [allCustommers, setAllCustommers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/user')
    .then(response => response.json())
    .then(res => setAllCustommers(res.slice(0,10)))
    .catch(err => console.log(err));
    // .then(res => console.log(res.slice(0,10)))
  }, [])

  return (
    <div className="MainPage">
      <h1>Main Page</h1>
      <button>Imprimir</button>
      <button>Adicionar Novo Cliente</button>
      <SearchBar />
      { allCustommers.map(custommer => {
        return <div key={custommer}>{ custommer["contato"] }</div>
      })

      }
    </div>
  )
}
    