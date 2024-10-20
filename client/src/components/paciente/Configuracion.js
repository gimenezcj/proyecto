import React, {useEffect, useParams, useState} from "react";
import {Row, Col,Image, Button} from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Modal from 'react-bootstrap/Modal';
import config from '../../config/config.json';
import Controles from "../emuns/Controles";

function Configuracion({activo, setActivo, setConfiguracion, configuracion}) {

  const handleClose = () => {
    setConfiguracion({tipo:'sinOperacion'});
    console.log(configuracion.teclas);
    setActivo(false);
  }
  const [cambio, setCambio]=useState({acelerar:false,frenar:false,derecha:false,izquierda:false,otro:false});
  const [dispositivoActual, setDispositivoActual]=useState(Controles.NINGUNO);

  const radios = [
    { name: 'teclado' , value: '1' },
    { name: 'joystick', value: '2' },
    { name: 'volante' , value: '3' },
  ];
  const [radioValue, setRadioValue] = useState('1');

  useEffect(()=>{
    switch(radioValue){
      case '1': setDispositivoActual(Controles.TECLADO); break;
      case '2': setDispositivoActual(Controles.JOYSTICK); break;
      case '3': setDispositivoActual(Controles.VOLANTE); break;
      default:
        break;
    }
  },[radioValue])



useEffect(()=>{setConfiguracion({tipo:'nuevoDispositivo', dispositivo: dispositivoActual});},[dispositivoActual.nombre]);
/* useEffect(()=>{
    setCambio({acelerar:configuracion.teclas.acelerar!==null});
console.log(cambio);
},[configuracion.teclas]); */

function setearAcelerar(){
//  console.log("configuracion setear acelerar");
  setConfiguracion({tipo:'setearAcelerador', dispositivoActual})
}
function setearFrenar(){
//  console.log("configuracion setear frenar");
  setConfiguracion({tipo:'setearFreno', dispositivoActual})
}
function setearDerecha(){
//  console.log("configuracion setear derecha");
  setConfiguracion({tipo:'setearDerecha', dispositivoActual})
}
function setearIzquierda(){
//  console.log("configuracion setear izquierda");
  setConfiguracion({tipo:'setearIzquierda', dispositivoActual})
}
console.log (configuracion);
return (
      <Modal show={activo} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Configuracion de dispositivo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Seleccione el dispositivo para realizar la rehabilitacion.<br/>     
            <ButtonGroup className="mb-2">
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
          ><span style={{margin:'1vh'}}>
            <Image src={config.ICONOS+radio.name+'.png '}  height='40vw'/>
            </span>
          </ToggleButton>
        ))}
      </ButtonGroup>

      <br/>Configurar acciones<br/>
        <Row>
          <Col>Ejemplo</Col>
          <Col>
            <Row>Acciones</Row>
            <Row><Button variant={configuracion.teclas.acelerar?'success':'danger'} onClick={setearAcelerar}>{configuracion.operacion==='setearAcelerador'?'presione...':'Acelerar'}</Button></Row>
            <Row><Button variant={configuracion.teclas.frenar!==null?'success':'danger'} onClick={setearFrenar}>{configuracion.operacion==='setearFreno'?'presione...':'Frenar'}</Button></Row>
            <Row><Button variant={configuracion.teclas.doblarDerecha!==null?'success':'danger'} onClick={setearDerecha}>{configuracion.operacion==='setearDerecha'?'presione...':'Girar a la derecha'}</Button></Row>
            <Row><Button variant={configuracion.teclas.doblarIzquierda!==null?'success':'danger'} onClick={setearIzquierda}>{configuracion.operacion==='setearIzquierda'?'presione...':'Girar a la izquierda'}</Button></Row>
          </Col></Row>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default Configuracion;