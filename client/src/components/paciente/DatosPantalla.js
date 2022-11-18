import React from "react";

export default function DatosPantalla (props){
  const {estado}= props;
  const {velocidad,anguloGiro,xActual,yActual,distancia,combustible}=estado;
  return (
    <>
    <div style={{position: 'absolute', top: '0',  left: '10px',  right: '0',  margin: '0 auto'}}>
      <div>velocidad: <span id='velocidad'>{velocidad}</span></div>
      <div>giro: <span id="anguloGiro">{anguloGiro}</span></div>
      <div>x actual: <span id="xActual">{xActual}</span></div>
      <div>y actual: <span id="yActual">{yActual}</span></div>
      <div>distancia: <span id="yActual">{distancia}</span></div>
      <div>combustible: <span id="yActual">{combustible}</span></div>
    </div>
    </>
  );
}

