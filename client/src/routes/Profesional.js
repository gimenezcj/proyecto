import React from "react";
import { useState,useEffect} from "react";
import { Routes, Route} from "react-router-dom";

//Paginas
import Principal2 from "../pages/profesional/Principal2";
import RegistrarEstudios from "../pages/profesional/RegistrarEstudios";

function ProfesionalRoutes  ({token, setToken})  {
  const [persona, setPersona] = useState(false);
  const [load,setLoad]=useState(false);
  const [paciente,setPaciente]=useState(false);

  useEffect(()=>{

    if(token!==undefined && token!==null) {
      setLoad(true);
     // setPaciente(token?token.info.persona.paciente:false);
     // setPersona(token.info.persona);
     
     setPaciente(false);
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
    {(load && !paciente) && <>
      <Route path='/' element={<Principal2 persona={persona} setToken={setToken}/>}/>
      <Route path='/registrarestudios/:rowIndex' element={<RegistrarEstudios/>} />
      </>}
    </Routes>
    </>
  );
}

export default ProfesionalRoutes;