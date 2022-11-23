import React from "react";
import { Col, Row, Button,Image } from "react-bootstrap";
import config from '../../config/config.json';

const Swal = require('sweetalert2');

export default function MenuMenorPrecio (props) {

  const {setEstado,ayudaEnCurso,activarVisual,activarSonora,completado}=props;

  const salir=()=>{
    Swal.fire({
      title: 'Seguro',
      text: 'Estas seguro que quieres volver, has logrado mucho hasta aqui. Tendras que rehacer el recorrido',
      icon: 'warning',
      showCancelButton: true,

      cancelButtonText: 'QUIERO SEGUIR INTENTANDO',
      cancelButtonColor: '#3f7f91',
      confirmButtonColor: '#d05b5b',
      confirmButtonText: 'QUIERO VOLVER AL INICIO'
    }).then((result) => {
      if (result.isConfirmed) {
        setEstado({tipo:'abandono'});
      }
    });
  }

  return (<>
  <Row>
    <Col md={{ span: 12, offset: 10 }}>
      {activarVisual && <>
        <Button disabled={ayudaEnCurso||completado} className="botonIcono" onClick={()=>{setEstado({tipo:'ayudaVisual'})}}><Image src={config.ICONOS+'ayudaVisual.png '} width='33vw'/></Button>
      </>}
      {activarSonora && <>
        <Button disabled={ayudaEnCurso||completado} className="botonIcono" onClick={()=>{setEstado({tipo:'ayudaSonora'})}}><Image src={config.ICONOS+'ayudaSonora.png '} width='33vw'/></Button>
        </>}
    <Button disabled={completado} className="botonIcono" onClick={salir}><Image src={config.ICONOS+'volver.png '} width='33vw' height='33vw'/></Button>
    </Col>
  </Row>
    
  </>)
}