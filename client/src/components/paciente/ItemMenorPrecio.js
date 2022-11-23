/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {gsap, Elastic} from 'gsap';

//import {Card} from 'react-bootstrap';

export default function ItemMenorPrecio (props) {
  const {datos,activarAyuda,setEstado, minimoId, tiempoInicial,clave}=props;
  const {ayudaSonora,tiempo,id}=datos;
  
  const audio=new Audio('/modelos/menorPrecio/'+ayudaSonora);

  const timeline=gsap.timeline()
  const timeline2=gsap.timeline();

  const mouseOver=()=>{
    if(!activarAyuda.ayudaEnCurso)
      timeline.clear().to('.imagen'+datos.id, {scale:1.5, ease: Elastic.easeOut.config( 1, 0.3),duration:1}) 
  }
  const deseleccionado=()=>{
    if(!activarAyuda.ayudaEnCurso)
      timeline.clear().to('.imagen'+datos.id, {scale:1, ease: Elastic.easeOut.config( 1, 0.3),duration:1})
  }

  useEffect(()=>{
    if(activarAyuda.visual && activarAyuda.turno===clave+1) {     
      timeline2.clear()
      .to('.precio'+datos.id,{opacity: 1, duration:1})
      .to('.imagen'+datos.id, {scale:1.5, ease: Elastic.easeOut.config( 1, 0.3),duration:1},'<') 
      .to('.precio'+datos.id,{duration:1, scale:1, ease: Elastic.easeOut.config( 1, 0.3) }, '<')
      .to('.precio'+datos.id,{opacity: 0,duration:0.8},"+="+tiempo)
      .to('.precio'+datos.id,{duration:1, scale:0.5, ease: Elastic.easeOut.config( 1, 0.3)}, '<')
      .to('.imagen'+datos.id, {scale:1, ease: Elastic.easeOut.config( 1, 0.3),duration:1},'<')
      .call(()=>{setEstado({tipo: 'siguienteTurno'})},null,">");
    }
    if(ayudaSonora && activarAyuda.sonora && activarAyuda.turno===clave+1) {
      timeline2.clear()
        .to('.imagen'+datos.id, {scale:1.5, ease: Elastic.easeOut.config( 1, 0.3),duration:1})
        .call(()=>{audio.play()},null,'<');
             
      audio.onended=()=>{
        timeline2
          .to('.imagen'+datos.id, {scale:1, ease: Elastic.easeOut.config( 1, 0.3),duration:1})
          .call(()=>{setEstado({tipo: 'siguienteTurno'})},null,'>');         
      }
    }

  },[activarAyuda])

  const seleccionar = ()=>{
    const tiempoActual= new Date();
    if(!activarAyuda.ayudaEnCurso) {
      setEstado({tipo: 'seleccionItem', valor: {id:id, tiempo: (tiempoActual- tiempoInicial)}})
    if(minimoId===id) 
      setEstado({tipo: 'completado'});
    else 
      setEstado({tipo: 'seleccionErronea', valor: true})
    }
  }

  return (<>
    <div style={{textAlign: 'center'}}>
    <div>
      <img 
        alt={datos.nombre} 
        src={'/modelos/menorPrecio/'+datos.imagen} 
        onMouseOver={mouseOver} 
        onMouseOut={deseleccionado} 
        style={{cursor:(!activarAyuda.ayudaEnCurso?'pointer':'default'),width:'12vw'}}
        className={'imagen'+datos.id+ ' imagen'}
        onClick={seleccionar}/>
    </div>

    <div style={{marginTop:'10vh'}}>
      <div style={{ position: 'relative', display: 'inline-block', textAlign: 'center', opacity:'0',scale:'0.5'}} className={'precio'+datos.id}>
        <img src='/modelos/menorPrecio/fondoPrecio.png' style={{width:'35vh'}}/>
        <div style={{position: 'absolute', top: '50%', left: '50%',transform: 'translate(-50%, -50%)', fontSize:'8vh'}}>{datos.precio}</div>
      </div>

    
    </div>
    </div>
  </>)
}