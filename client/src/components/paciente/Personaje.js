import React from "react";
import {Image} from 'react-bootstrap';

function Personaje ({personaje}) {
  return (
    <>
      <h2><Image src={"/imagenes/avatares/personajes/" + personaje.imagen.nombreArchivo} style={{width:'10vw'}}/></h2>
    </>
  );
}

export default Personaje;