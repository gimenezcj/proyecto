import React, { useEffect, useState } from "react";

import Encabezado from '../../components/paciente/Encabezado'
import ListaPacientes from "../../components/profesional/ListaPacientes";
import Menu from "../../components/profesional/Menu";
import config from '../../config/config.json';
import Utils from "../../utils/Utils";

export default function Principal ({persona, setToken}) { 

  const [pacientes,setPacientes]=useState([]);

  const leerPacientes = async ()=>{
    fetch(Utils.getUrl()+'fonos/'+persona.fonoaudiologo.id+'/pacientes',{method:'GET'})
    .then(res=>res.json())
    .then(valor=>{setPacientes(valor.data.pacientes);console.log('pacientes leidos...')})
  }
  useEffect(()=>{
    if(pacientes.length===0){console.log('leer pacientes...');
      leerPacientes();
    }

  },[])

  return (
    <>
      <Encabezado  persona={persona}/>
      <Menu setToken={setToken} titulo="Listado de pacientes" botones={config.BOTONES.CERRAR+config.BOTONES.NUEVOPACIENTE} iconoVentana='pacientes2.png'/>
      <ListaPacientes persona={persona} pacientes={pacientes}/>

    </>
  );
}

