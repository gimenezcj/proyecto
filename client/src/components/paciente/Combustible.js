
import React from "react";
import ReactSpeedometer from "react-d3-speedometer"

export default function Combustible (props){
  const {combustible}=props.estado;
  const capacidadTanque=50;       //Capacidad del tanque de combustible expresada en litros

  return (
    <div style={{position: 'absolute',top: '81vh', 
      width: '10vw', height: '12vh', 
      left: '85vw',overflow: 'hidden', backgroundColor: 'black',padding: '10px', rotate: '90deg'}}>
      <ReactSpeedometer 
          currentValueText="-"
          maxValue={capacidadTanque}
          value={(combustible>0?capacidadTanque-combustible:capacidadTanque)}
          needleColor="white"
          segments={4}
          needleTransitionDuration={2000}
          needleTransition="easeElastic"
          textColor="white"
          width={120}
          height={120}
          dimensionUnit="vw"
          endColor="red"
          startColor="white"
          customSegmentLabels={[
            {text: 'full',position: 'OUTSIDE',color: 'white'},
            {text: '3/2',position: 'OUTSIDE',color: 'white'},
            {text: '1/2',position: 'OUTSIDE',color: 'white'},
            {text: '0',position: 'OUTSIDE',color: 'red'}
          ]}
          ringWidth={15}
          />
    </div>
  );
}
