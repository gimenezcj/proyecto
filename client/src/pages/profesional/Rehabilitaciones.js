import React, { useState } from "react";
import Encabezado from "../../components/paciente/Encabezado";
import Menu from "../../components/profesional/Menu";
import { useLocation } from 'react-router-dom';
import config from '../../config/config.json';
import ListaRehabilitaciones from "../../components/profesional/ListaRehabilitaciones";


export default function Rehabilitaciones ({setToken,token,persona, setElemento}) { 
    
    const location=useLocation();
    const pacienteId=location.state.id;
    const [pacientes]=useState(persona.fonoaudiologo.pacientes.filter(x=>x.id===pacienteId));

    const setState = () => {
      return {state:{pacienteId:pacienteId}}
    }

    return (
      <>
        <Encabezado  persona={persona}/>
        <Menu setToken={setToken}  botones={config.BOTONES.VOLVER+config.BOTONES.NUEVAREHABILIACION} iconoVentana='rehabilitaciones.png'
          titulo={'Listado de rehabilitaciones'}  setState={setState}/>
        <ListaRehabilitaciones paciente={pacientes[0]} fonoaudiologoId={persona.fonoaudiologo.id} setElemento={setElemento}/>
      </>)
}