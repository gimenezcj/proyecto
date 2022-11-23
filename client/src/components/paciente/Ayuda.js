/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import {gsap} from 'gsap';


export default function Ayuda (props) {
  const {estado, setEstado}=props;
  const {activarAyuda,ayuda}=estado;
  const {visual,sonora}=ayuda;

  function despues(){
    setEstado({tipo: 'siguienteTurno'})
  }

  const timeline=gsap.timeline();

  const audio=new Audio('/modelos/menorPrecio/'+sonora.archivo);
  audio.loop = false;


  useEffect(()=>{
    if (activarAyuda.visual && (activarAyuda.turno===0)) {
      timeline.clear()
      .to('.texto',{opacity: 1, duration:1})
      .to('.texto',{opacity: 0,duration:1},"+="+visual.tiempo)      
      .call(despues,null,"+=1");
    }
    if (activarAyuda.sonora && activarAyuda.turno===0) {
      audio.onended=()=>setEstado({tipo: 'siguienteTurno'});
      audio.play();
    }
  },[activarAyuda])

    return (<>
  <p style={{fontSize: '5vh', textAlign:'center'}} className='texto'>
    {visual.texto}
    </p>
  </>)
}