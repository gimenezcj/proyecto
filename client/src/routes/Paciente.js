import React, { useState,useEffect} from "react";
import { Routes, Route} from "react-router-dom";

//Paginas
import Principal from "../pages/paciente/Principal";
import Personajes from "../pages/paciente/Personajes";
import Valijas from "../pages/paciente/Valijas";
import Recorrido from "../pages/paciente/Recorrido";
import MenorPrecio from "../pages/paciente/MenorPrecio";

function PacienteRoutes  ({token, setToken})  {

  const [persona, setPersona] = useState(false);

  const [load,setLoad]=useState(false);
  const [paciente,setPaciente]=useState(false);
  const [listaR, setListaR]=useState([]);

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


  return (    
    <Routes>
     {(load && paciente) && <>
      <Route path='/' element={<Principal persona={persona} setPersona={setPersona} setListaR={setListaR} listaR={listaR} setToken={setToken}/>}/>
      <Route path='/personajes' element={<Personajes persona={persona} setPersona={setPersona}/>}/>
      <Route path='/valijas' element={<Valijas persona={persona} setPersona={setPersona}/>}/>
      <Route path='/recorrido' element={<Recorrido/>}/>    
      <Route path="/menorPrecio" element={<MenorPrecio/>}/>
      </>}
    </Routes>    
  );
}

export default PacienteRoutes;

