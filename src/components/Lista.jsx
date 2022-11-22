import { useEffect, useState } from "react"
import Axios from 'axios'

export const Lista = () =>{
    const [pokemons, setPokemons] = useState([]);
    const [listaOculta, setListaOculta] = useState(false);
    const [statusDaLista, setStatusDaLista] = useState("A lista de Pokemons está visível")
    
    useEffect(() => {
        console.log("Componente montado");
        async function pegaDados(){
            const reposta = await Axios.get('https://pokeapi.co/api/v2/pokemon')
            setPokemons(reposta.data.results)
        }
        pegaDados();

        return () =>{
            console.log("Componente desmontado");
        }

    },[]);

    useEffect(()=>{
      if(listaOculta){
        setStatusDaLista("A lista de Pokemons esta oculta!");
      }else{
        setStatusDaLista("A lista de Pokemons está visível!");
      }  
        
    }, [listaOculta]);


    function ocultarLista(){
        setListaOculta((valor) => !valor);
    }

    return(
        <>
            <h1>Pokemons</h1>
            <input type ='checkbox' onChange={ocultarLista}/>
            <label>Ocultar lista</label>
            <br/>
            <h2>{statusDaLista}</h2>
            <br/>
            {listaOculta
                ? null
                : pokemons.map(pokemon => {
                    return <p key={pokemon.name}>{pokemon.name}</p>
                    })}                 
                        
        </>
    )
}
