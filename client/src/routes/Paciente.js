import React, { useState,useEffect} from "react";
import { Routes, Route} from "react-router-dom";

//Paginas
import Principal from "../pages/paciente/Principal";
import Personajes from "../pages/paciente/Personajes";
import Valijas from "../pages/paciente/Valijas";
import Recorrido from "../pages/paciente/Recorrido";
import MenorPrecio from "../pages/paciente/MenorPrecio";
import Comandos from "../components/controles/Comandos";

function PacienteRoutes  ({token, setToken})  {

  const [persona, setPersona] = useState(false);

  const [load,setLoad]=useState(false);
  const [paciente,setPaciente]=useState(false);
  const [listaR, setListaR]=useState([]);

  const {comandos, setComandos}=Comandos();

  useEffect(()=>{

    if(token!==undefined && token!==null) {
      setLoad(true);
      setPaciente(token?token.info.persona.paciente:false);
      setPersona(token.info.persona);
      if (token.info.persona.paciente) setListaR(token.info.persona.paciente.rehabilitaciones);
    }
    else {
      setLoad(false);
      setPaciente(false);
      setPersona(false);
    }
  },[token])

/*   useEffect(()=>{
    setComandos({tipo:'nada'})
  },[]) */

  return (    
    <Routes>
     {(load && paciente) && <>
      <Route path='/' element={<Principal persona={persona} setPersona={setPersona} setListaR={setListaR} listaR={listaR} setToken={setToken} comandos={{comandos,setComandos}}/>}/>
      <Route path='/personajes' element={<Personajes persona={persona} setPersona={setPersona}/>}/>
      <Route path='/valijas' element={<Valijas persona={persona} setPersona={setPersona}/>}/>
      <Route path='/recorrido' element={<Recorrido comandos={{comandos,setComandos}}/>}/>    
      <Route path="/menorPrecio" element={<MenorPrecio/>}/>
      </>}
    </Routes>    
  );
}

export default PacienteRoutes;

