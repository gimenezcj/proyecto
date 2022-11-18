import React from "react";

export default function Volante (props){
  const {estado}= props;
  const {anguloGiro}=estado;
  return (
    <>
      <div style={{position: 'absolute',top: '60vh', width: '400px', height: '40vh', left: '40vw', transformOrigin: '200px 200px',overflow: 'hidden'}}>
        <div  style={{ 
          width: '400px',height: '400px',backgroundSize: 'cover',background: 'url("imagenes/avatares/volantes/volanteHonda-400.png")  no-repeat',
          transform: 'rotate('+(-anguloGiro)+'deg)'}}></div>
      </div>
    </>
  );
}