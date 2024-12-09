import React, {useEffect, useParams, useState} from "react";
import {Row, Col,Image, Button} from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Form from 'react-bootstrap/Form';

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
  const teclasIniciales={acelerar:null, frenar: null, frenoMano:null, moverVolante:null, doblarDerecha:null, doblarIzquierda:null, mantenerVelocidad: null, cambioDireccion:null, operacion:null};
  const [teclasLocales, setTeclasLocales]=useState(teclasIniciales);

  const radios = [
    { name: 'teclado' , value: '1' },
   /*  { name: 'joystick', value: '2' }, */
    { name: 'volante' , value: '3' },
  ];
  const [radioValue, setRadioValue] = useState('1');
  const [opcion,setOpcion]=useState(false);

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
    
    setConfiguracion({tipo:'setearOpcion',opcion: opcion});
  },[opcion])

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
const setearDireccionAdelante=()=>setConfiguracion({tipo:'setearDireccionAdelante', dispositivoActual});
const setearDireccionAtras =()=>setConfiguracion({tipo:'setearDireccionAtras', dispositivoActual});
const moverVolante         =()=>setConfiguracion({tipo:'setearMoverVolante', dispositivoActual});

useEffect(()=>{
  setTeclasLocales(configuracion.teclas);
},[configuracion.teclas])
  
const mostrarCombinacion=(tecla)=>tecla?' (id:'+tecla[0].index+' tipo:'+tecla[0].tipo+')':'';
const solicitarTeclado=()=><>Condifurado por defecto<br/>flecha arriba- acelerar<br/>flecha abajo- frenar</>;
const solicitarJoystick=()=>
        <Row>
          <Col>Ejemplo
          <Row>      
            <Form.Check 
        type="switch"
        id="custom-switch"
        label="Invertir controles"
        checked={opcion}
        onChange={(e) => setOpcion(e.target.checked)}
          /></Row>
          </Col>
          <Col>
            <Row>Acciones</Row>
            <Row><Button variant={teclasLocales.acelerar?'success':'danger'} onClick={setearAcelerar}>{configuracion.operacion==='setearAcelerador'?'presione...':'Acelerar '+mostrarCombinacion(teclasLocales.acelerar)} </Button></Row>
            <Row><Button variant={teclasLocales.frenar!==null?'success':'danger'} onClick={setearFrenar}>{configuracion.operacion==='setearFreno'?'presione...':'Frenar '+mostrarCombinacion(teclasLocales.frenar)}</Button></Row>
            {(teclasLocales.acelerar!=null&&teclasLocales.acelerar[0].tipo==='variable'&&teclasLocales.cambioDireccion===null) && <>
              <Row><Button variant={teclasLocales.direccionAdelante?'success':'danger'} onClick={setearDireccionAdelante}>{configuracion.operacion==='setearDireccionAdelante'?'presione...':'Hacia adelante '+mostrarCombinacion(teclasLocales.direccionAdelante)} </Button></Row>                
              <Row><Button variant={teclasLocales.direccionAtras?'success':'danger'} onClick={setearDireccionAtras}>{configuracion.operacion==='setearDireccionAtras'?'presione...':'Hacia Atras '+mostrarCombinacion(teclasLocales.direccionAtras)} </Button></Row>                
            </>}

            {(teclasLocales.acelerar!=null&&teclasLocales.acelerar[0].tipo==='variable'&&teclasLocales.cambioDireccion!==null) && 
              <Row><Button variant={teclasLocales.cambioDireccion?'success':'danger'} onClick={setearCambioDireccion}>{configuracion.operacion==='setearCambioDireccion'?'presione...':'Adelante/Atras '+mostrarCombinacion(teclasLocales.cambioDireccion)} </Button></Row>                
            }

            {(teclasLocales.moverVolante===null) &&<>
              <Row><Button variant={teclasLocales.doblarDerecha!==null?'success':'danger'} onClick={setearDerecha}>{configuracion.operacion==='setearDerecha'?'presione...':'Girar a la derecha '+mostrarCombinacion(teclasLocales.doblarDerecha)}</Button></Row>
              <Row><Button variant={teclasLocales.doblarIzquierda!==null?'success':'danger'} onClick={setearIzquierda}>{configuracion.operacion==='setearIzquierda'?'presione...':'Girar a la izquierda ' +mostrarCombinacion(teclasLocales.doblarIzquierda)}</Button></Row>
            </>}
            {(teclasLocales.moverVolante!==null)&&
            <Row><Button variant={teclasLocales.moverVolante!==null?'success':'danger'} onClick={moverVolante}>
                {configuracion.operacion==='setearMoverVolante'?'mueva el volante...':'Volante '+mostrarCombinacion(teclasLocales.moverVolante)}</Button></Row>
            }

          </Col></Row>;

const solicitarVolante=()=>
        <Row>
          <Col>Ejemplo</Col>
          <Col>
            <Row>Acciones</Row>
            <Row><Button variant={teclasLocales.acelerar?'success':'danger'} onClick={setearAcelerar}>{configuracion.operacion==='setearAcelerador'?'presione...':'Acelerar '+mostrarCombinacion(teclasLocales.acelerar)} </Button></Row>
            <Row><Button variant={teclasLocales.frenar!==null?'success':'danger'} onClick={setearFrenar}>{configuracion.operacion==='setearFreno'?'presione...':'Frenar '+mostrarCombinacion(teclasLocales.frenar)}</Button></Row>
            <Row><Button variant={teclasLocales.doblarDerecha!==null?'success':'danger'} onClick={setearDerecha}>{configuracion.operacion==='setearDerecha'?'presione...':'Girar volante '+mostrarCombinacion(teclasLocales.doblarDerecha)}</Button></Row>
            <Row><Button variant={teclasLocales.cambioDireccion!==null?'success':'danger'} onClick={setearCambioDireccion}>{configuracion.operacion==='setearCambioDireccion'?'presione...':'Adelate/Atras '+mostrarCombinacion(teclasLocales.cambioDireccion)}</Button></Row>
          </Col></Row>;

const borrarTeclas=()=>{
  //Lo vamos a dejar para desupues
/*   if(radioValue!=='1'&&teclasLocales!==teclasIniciales)
    return <>Borrar Teclas</>
 */    return <></>;
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
      {radioValue==='1'&&solicitarTeclado()}
{/*       {radioValue==='2'&&solicitarJoystick()} */}
      {radioValue==='3'&&solicitarJoystick()}
      {borrarTeclas()}

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