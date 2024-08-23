import React, { useState,useEffect} from "react";
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
import Estadisticas from "../pages/profesional/Estadisticas";

import config from '../config/config.json';
import Utils from "../utils/Utils";

function ProfesionalRoutes  ({token, setToken})  {

  const [persona, setPersona] = useState(false);
  const [load,setLoad]=useState(false);
  const [paciente,setPaciente]=useState(false);
  const [fono,setFono]=useState(false);
  const [elementoId,setElementoId]=useState(null);
  const [elemento, setElemento]=useState(null);
  const [escenarios,setEscenarios] =useState(null);


  const escenariosDisponibles = async ()=>{
    fetch(Utils.getUrl()+'escenarios/list',{method:'GET'})
    .then(res=>res.json())
    .then(valor=>setEscenarios(valor.data))
  }


  useEffect(()=>{
    if(token!==undefined && token!==null) {
      setLoad(true);
      setPaciente(token?token.info.persona.paciente:false);
      setFono(token?token.info.persona.fonoaudiologo:false);
      setPersona(token.info.persona);
    }
    else {
      setLoad(false);
      setPaciente(false);
      setPersona(false);
    }
  },[token]);

  useEffect(()=>{
    if(!paciente){
      escenariosDisponibles();
    }

  },[paciente])

  return (
    <Routes>
    {(load && fono) && <>
      <Route exact path='/' element={<Principal persona={persona} setToken={setToken}/>}/>
      <Route path='/paciente/nuevo' element={< NuevoPaciente  token={token} setToken={setToken} accion='nuevo' persona={persona}/>} />
      <Route path='/paciente/informacion/:id' element={< NuevoPaciente  token={token} setToken={setToken} accion='informacion' persona={persona}/>} />      
      <Route path='/paciente/rehabilitaciones/:id' element={< Rehabilitaciones token={token} setToken={setToken}  persona={persona} setElemento={setElemento}/>}/>
      <Route path='/rehabilitacion/nueva/' element={<Rehabilitacion 
        rehabilitacion={null} profesional={persona} setToken={setToken} escenarios={escenarios} 
      />}/>
      <Route path='/rehabilitacion/estadistica' element={< Estadisticas  rehabilitacion={elemento} profesional={persona} setToken={setToken}/>} />
      <Route path='/rehabilitacion/informacion' element={<Rehabilitacion 
        rehabilitacion={elemento} profesional={persona} setToken={setToken}  escenarios={escenarios}  
      />}/>
      </>}
      
    </Routes>
  );
}

export default ProfesionalRoutes;