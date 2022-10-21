import React from "react";
import {Image} from 'react-bootstrap';

function Puntaje ({puntaje}) {

  const color=()=>{
    if(puntaje<500)
      return 'red'
    else 
      return 'green'
  }

  return (
    <>
      <h2 style={{color:color(), textShadow:'1px  0px 0px white, 0px  1px 0px white, -1px  0px 0px white, 0px -1px 0px white'}}><Image src={"/imagenes/base/estrella.png"} style={{width:'3vw'}}/> {puntaje}</h2>
    </>
  );
}

export default Puntaje;

