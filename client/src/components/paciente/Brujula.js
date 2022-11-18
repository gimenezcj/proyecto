import React from "react";

export default function Brujula (props){
  const {brujula}= props;
  return (
    <>
      <div style={{position: 'absolute',top: '68vh', width: '4.5vw', height: '10vh', left: '52.5vw', transformOrigin: '1.5vw 2vh',overflow: 'hidden', 
       padding:'0.5vw'}}>
        <div  style={{ 
          width: '3.2vw',height: '8vh',backgroundSize: 'cover',background: 'url("imagenes/base/flechaBrujula.png")  no-repeat',
          transform: 'rotate('+(-brujula)+'deg)'}}></div>
      </div>
    </>
  );
}