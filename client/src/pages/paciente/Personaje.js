import React from "react";
import {Image} from 'react-bootstrap';
import Puntaje from "../../components/paciente/Puntaje";

function Personaje ({personaje, token, setToken}) {
  return (
    <>
      <h2><Image src={"/imagenes/avatares/personajes/" + personaje.imagen.nombreArchivo} style={{width:'10vw'}}/></h2>
      <Puntaje puntaje={personaje.puntaje}/>
    </>
  );
}

export default Personaje;