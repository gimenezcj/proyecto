
import React from "react";
import ReactSpeedometer from "react-d3-speedometer"

export default function Velocimetro (props){
  const {velocidad}=props.estado;

  return (
    <div style={{position: 'absolute',top: '78vh', width: '16vw', height: '18vh', left: '70vw',overflow: 'hidden', backgroundColor: 'black',padding: '10px'}}>
      <ReactSpeedometer 
          maxValue={150}
          value={Math.floor(Math.abs(velocidad*100))}
          needleColor="white"
          startColor="green"
          segments={10}
          endColor="red"
          needleTransitionDuration={2000}
          needleTransition="easeElastic"
          textColor="white"
          width={200}
          height={200}
          dimensionUnit="vw"
          ringWidth={17}
          />
    </div>
    
  );
}
