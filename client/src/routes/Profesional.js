import React from "react";
import { useState,useEffect} from "react";
import { Routes, Route} from "react-router-dom";
import NuevoPaciente from "../pages/profesional/nuevoPaciente";
import Rehabilitaciones from '../pages/profesional/Rehabilitaciones';

//Paginas
//import Principal2 from "../pages/profesional/Principal2";
import Principal from "../pages/profesional/Principal";
import Principal2 from "../pages/profesional/Principal2";
import RegistrarEstudios from "../pages/profesional/RegistrarEstudios";
import FormikRehabilitacion from "../components/profesional/FormikRehabilitacion";
import Rehabilitacion from "../pages/profesional/Rehabilitacion";

function ProfesionalRoutes  ({token, setToken})  {

  const [persona, setPersona] = useState(false);
  const [load,setLoad]=useState(false);
  const [paciente,setPaciente]=useState(false);
  const [elementoId,setElementoId]=useState(null);
  const [elemento, setElemento]=useState(null);



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
    {(load && !paciente) && <>
      <Route exact path='/' element={<Principal persona={persona} setToken={setToken}/>}/>
      <Route path='/paciente/nuevo' element={< NuevoPaciente  token={token} setToken={setToken} accion='nuevo' persona={persona}/>} />
      <Route path='/paciente/informacion/:id' element={< NuevoPaciente  token={token} setToken={setToken} accion='informacion' persona={persona}/>} />
      <Route path='/paciente/rehabilitaciones/:id' element={< Rehabilitaciones token={token} setToken={setToken}  persona={persona} setElemento={setElemento}/>}/>
      <Route path='/rehabilitacion/nueva/' element={<Rehabilitacion 
        rehabilitacion={null} profesional={persona} setToken={setToken}
      />}/>
      <Route path='/rehabilitacion/informacion' element={<Rehabilitacion 
        rehabilitacion={elemento} profesional={persona} setToken={setToken}
      />}/>


      <Route path='/registrarestudios/:rowIndex' element={<RegistrarEstudios/>} />
      <Route path='/prueba' element={<Principal2/>} />
      </>}
    </Routes>
    </>
  );
}

export default ProfesionalRoutes;

//<Route path='/rehabilitacion/informacion' element={<FormikRehabilitacion rehabilitacion={elemento}        
//pacienteId={(!paciente?null:paciente)} 
//profesionalId={(!persona?null:persona.fonoaudiologo.id)}/>}/>