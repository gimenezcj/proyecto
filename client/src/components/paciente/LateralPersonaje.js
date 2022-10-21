import React from "react";
import { useState} from "react";
import { Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import config from '../../config/config.json';

import Puntaje from "./Puntaje";
import Personaje from "./Personaje";

const Swal = require('sweetalert2');

function LateralPersonaje ({personaje, cambio,pi}) {

  const adquirirPersonaje =async (a,b,c) => {

    const info={personajeId:a, personajeSeleccionadoId:b, nuevoPuntajeAcumulado:c}
console.log(info);
    const data = await fetch(config.SERVER_API_URL + 'personajes/adquirir', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    });
    return await data.json();
  }


  const [puntaje, setPuntaje]= useState(personaje.puntajeAcumulado);
  const navigate = useNavigate();

  const deshabilitado = ()=> {return pi.id===personaje.imagen.id}
  const color=() => {
    if(deshabilitado())
      return 'secondary'; 
    else return 'primary'}
  const confirmar=()=>{
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas a punto de adquirir un nuevo personaje, se descontaran '+pi.valor+' creditos de tu cuenta!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, lo quiero!'
    }).then((result) => {
      if (result.isConfirmed) {
        personaje.imagen=pi;
        personaje.puntajeAcumulado=personaje.puntajeAcumulado-pi.valor;
        setPuntaje(personaje.puntajeAcumulado);
       console.log(personaje);
        adquirirPersonaje(personaje.id,personaje.imagen.id,personaje.puntajeAcumulado);
        Swal.fire(
          'Felicitaciones, nuevo personaje adquirido',
          'Se han descontado '+pi.valor+' creditos de tu cuenta.',
          'success'
        )
      }
    })
    
  }

  return (

      <Col>
        <Row style={{background: '#4176FF',textAlign:'center'}}><Puntaje puntaje={puntaje}/></Row>
        <Row style={{paddingTop: '1vw', textAlign:'center'}}><Personaje personaje={pi}/></Row>
        {(cambio) && 
        <Row style={{paddingTop: '2vw', textAlign: 'center'}}><Col><Button onClick={()=> navigate("/personajes", { replace: true })}>CAMBIAR DE PERSONAJE</Button></Col></Row>
        }
        {(!cambio) && 
        <Row style={{paddingTop: '2vw', textAlign: 'center'}}><Col><Button  variant={color()} disabled={deshabilitado()} onClick={confirmar}>CONFIRMAR COMPRA</Button></Col></Row>
        }

      </Col>
  );
}

export default LateralPersonaje;