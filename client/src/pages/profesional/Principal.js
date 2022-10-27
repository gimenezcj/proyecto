import React, { useEffect, useState } from "react";

import Encabezado from '../../components/paciente/Encabezado'
import ListaPacientes from "../../components/profesional/ListaPacientes";
import Menu from "../../components/profesional/Menu";
import config from '../../config/config.json';

export default function Principal ({persona, setToken}) { 

  return (
    <>
      <Encabezado  persona={persona}/>
      <Menu setToken={setToken} titulo="Listado de pacientes" botones={config.BOTONES.CERRAR+config.BOTONES.NUEVOPACIENTE} iconoVentana='pacientes2.png'/>
      <ListaPacientes persona={persona}/>

    </>
  );
}

