import React from "react";
import { Image} from 'react-bootstrap';

function Valija ({valija}) {
  return (
      <>
        <h2><Image src={"/imagenes/avatares/valijas/"+valija.imagenBase.nombreArchivo} style={{width:'25vw'}}/></h2>
      </>
  );
}

export default Valija;