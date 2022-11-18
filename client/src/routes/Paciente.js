import React from "react";
import { useState,useEffect} from "react";
import { Routes, Route} from "react-router-dom";

//Paginas
import Principal from "../pages/paciente/Principal";
import Personajes from "../pages/paciente/Personajes";
import Valijas from "../pages/paciente/Valijas";
import Recorrido from "../pages/paciente/Recorrido";

function PacienteRoutes  ({token, setToken})  {

  const [persona, setPersona] = useState(false);

  const [load,setLoad]=useState(false);
  const [paciente,setPaciente]=useState(false);

  useEffect(()=>{

    if(token!==undefined && token!==null) {
      setLoad(true);
      setPaciente(token?token.info.persona.paciente:false);
      setPersona(token.info.persona);
    }
    else {
      setLoad(false);
      setPaciente(false);
      setPersona(false);
    }
  },[token])


  return (
    <>
    <Routes>
     {(load && paciente) && <>
      <Route path='/' element={<Principal persona={persona} setPersona={setPersona} setToken={setToken}/>}/>
      <Route path='/personajes' element={<Personajes persona={persona} setPersona={setPersona}/>}/>
      <Route path='/valijas' element={<Valijas persona={persona} setPersona={setPersona}/>}/>
      <Route path='/recorrido' element={<Recorrido/>}/>    
      </>}
    </Routes>
    </>
  );
}

export default PacienteRoutes;

