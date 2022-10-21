import React from "react";
import {Image} from 'react-bootstrap';

function Personaje ({personaje}) {
  return (
    <>
      <h2><Image src={"/imagenes/avatares/personajes/" + personaje.imagenBase.nombreArchivo} style={{width:'15vw'}}/></h2>
    </>
  );
}

export default Personaje;