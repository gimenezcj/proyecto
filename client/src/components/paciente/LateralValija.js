import React, {useState} from "react";
import { Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';

import Puntaje from "./Puntaje";

import Valija from "./Valija";

const Swal = require('sweetalert2');

function LateralValija ({personaje, cambio,pi}) { 
  const navigate = useNavigate();
  const [puntaje, setPuntaje]= useState(personaje.puntajeAcumulado);
  const deshabilitado = ()=> {return pi.id===personaje.valija.id}
  const color=() => {
    if(deshabilitado())
      return 'secondary'; 
    else return 'primary'}

    const adquirirValija =async (a,b,c) => {

      const info={personajeId:a, valijaSeleccionadaId:b, nuevoPuntajeAcumulado:c}
  console.log(info);
      const data = await fetch(config.SERVER_API_URL + 'personajes/adquirirValija', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(info)
      });
      return await data.json();
    }

  const confirmar=()=>{
    Swal.fire({
      title: 'Estas seguro?',
      text: 'Estas a punto de adquirir una nueva valija, se descontaran '+pi.valor+' creditos de tu cuenta!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, lo quiero!'
    }).then((result) => {
      if (result.isConfirmed) {
        personaje.valija=pi;
        personaje.puntajeAcumulado=personaje.puntajeAcumulado-pi.valor;
        setPuntaje(personaje.puntajeAcumulado);
       adquirirValija(personaje.id,personaje.valija.id,personaje.puntajeAcumulado);
        Swal.fire(
          'Felicitaciones, nueva valija adquirida',
          'Se han descontado '+pi.valor+' creditos de tu cuenta.',
          'success'
        )
      }
    })   
  }


  return (
    <>
      <Col>
        
        
        {(cambio) && <>
        <Row style={{background: '#4176FF',textAlign:'center'}}><h4>Insignias ganadas</h4></Row>
        <Row style={{paddingTop: '1vw', textAlign:'center'}}><Valija valija={pi}/></Row>
        <Row style={{paddingTop: '2vw', textAlign: 'center'}}><Col><Button onClick={()=> navigate("/valijas", { replace: true })}>CAMBIAR VALIJA</Button></Col></Row>
        </>}
        {(!cambio) && <> 
        <Row style={{background: '#4176FF',textAlign:'center'}}><Puntaje puntaje={puntaje}/></Row>
        <Row style={{paddingTop: '1vw', textAlign:'center'}}><Valija valija={pi}/></Row>
        <Row style={{paddingTop: '2vw', textAlign: 'center'}}><Col><Button  variant={color()} disabled={deshabilitado()} onClick={confirmar}>CONFIRMAR COMPRA</Button></Col></Row>
        </> }
      </Col>
    </>
  );
}

export default LateralValija;  