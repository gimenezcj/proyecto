import React, {useEffect, useParams, useState} from "react";
import {Row, Col,Image, Button} from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

import Modal from 'react-bootstrap/Modal';
import config from '../../config/config.json';
import Controles from "../emuns/Controles";
import PropTypes from 'prop-types';


function Configuracion({activo, setActivo, setConfiguracion, configuracion}) {

  Configuracion.propTypes= {
    activo: PropTypes.bool.isRequired,
    setActivo: PropTypes.func.isRequired,
    setConfiguracion: PropTypes.func.isRequired,
  };

  const handleClose = () => {
    setConfiguracion({tipo:'sinOperacion'});console.log('13');
    //console.log(configuracion.teclas);
    setActivo(false);
  }
  const [cambio, setCambio]=useState({acelerar:false,frenar:false,derecha:false,izquierda:false,otro:false});
  const [dispositivoActual, setDispositivoActual]=useState(configuracion.control);
  const [teclasLocales, setTeclasLocales]=useState({acelerar:null, frenar: null, doblarDerecha:null, doblarIzquierda:null, cambioDireccion:null});

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

  useEffect(()=>{
    //buscar el valor de referencia
    setConfiguracion({tipo:'setearInicial'});
  },[dispositivoActual])

useEffect(()=>{
  setDispositivoActual(configuracion.control);
  switch (configuracion.control) {
    case Controles.TECLADO:
      setRadioValue('1')
      break;
      case Controles.JOYSTICK:
        setRadioValue('2')
        break;
      
    default:
      setRadioValue('3')

  }

},[])

useEffect(()=>{
  setConfiguracion({tipo:'nuevoDispositivo', dispositivo: dispositivoActual});
},[dispositivoActual.nombre]);

const setearAcelerar       =()=>setConfiguracion({tipo:'setearAcelerador', dispositivoActual});
const setearFrenar         =()=>setConfiguracion({tipo:'setearFreno', dispositivoActual});
const setearDerecha        =()=>setConfiguracion({tipo:'setearDerecha', dispositivoActual});
const setearIzquierda      =()=>setConfiguracion({tipo:'setearIzquierda', dispositivoActual});
const setearCambioDireccion=()=>setConfiguracion({tipo:'setearCambioDireccion', dispositivoActual});

useEffect(()=>{
  console.log('se acrtuaLIZO algo',configuracion.teclas);
  setTeclasLocales(configuracion.teclas);
},[configuracion.teclas])
  
const mostrarCombinacion=(tecla)=>{  
  console.log(tecla);
  return tecla?tecla[0].index+' '+tecla[0].tipo:'';
}

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
            <Row><Button variant={teclasLocales.acelerar?'success':'danger'} onClick={setearAcelerar}>{configuracion.operacion==='setearAcelerador'?'presione...':'Acelerar '+mostrarCombinacion(teclasLocales.acelerar)} </Button></Row>
            <Row><Button variant={teclasLocales.frenar!==null?'success':'danger'} onClick={setearFrenar}>{configuracion.operacion==='setearFreno'?'presione...':'Frenar '+mostrarCombinacion(teclasLocales.frenar)}</Button></Row>
            <Row><Button variant={teclasLocales.doblarDerecha!==null?'success':'danger'} onClick={setearDerecha}>{configuracion.operacion==='setearDerecha'?'presione...':'Girar a la derecha '+mostrarCombinacion(teclasLocales.doblarDerecha)}</Button></Row>
            <Row><Button variant={teclasLocales.doblarIzquierda!==null?'success':'danger'} onClick={setearIzquierda}>{configuracion.operacion==='setearIzquierda'?'presione...':'Girar a la izquierda ' +mostrarCombinacion(teclasLocales.doblarIzquierda)}</Button></Row>
            <Row><Button variant={teclasLocales.cambioDireccion!==null?'success':'danger'} onClick={setearCambioDireccion}>{configuracion.operacion==='setearCambioDireccion'?'presione...':'Adelate/Atras '+mostrarCombinacion(teclasLocales.cambioDireccion)}</Button></Row>
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