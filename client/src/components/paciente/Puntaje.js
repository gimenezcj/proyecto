import React from "react";
import {Image} from 'react-bootstrap';

function Puntaje ({puntaje}) {
  return (
    <>
      <h2><Image src={"/imagenes/base/estrella.png"} style={{width:'3vw'}}/> {puntaje}</h2>
    </>
  );
}

export default Puntaje;