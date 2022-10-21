import React from "react";
import {Row, Col,Image} from 'react-bootstrap';

function Encabezado ({persona}) {

  return (
    <Row>
      <Col><Image src={"/imagenes/base/logo.png"} style={{height:'6vw'}}/></Col>
      <Col xs={6}><h2 style={{textAlign: "center",fontSize: '2.7vw', paddingTop: '2.7vw'}}>Hola, bienvenido {persona.nombre} {persona.apellido}</h2></Col>
      <Col style={{display:'flex', justifyContent:'right'}}><Image  src={"/imagenes/base/logoCodapli.png"} style={{height:'6vw'}}/> <Image  src={"/imagenes/base/logoUtn.png"} style={{height:'6vw'}}/></Col>
    </Row>
  );
}

export default Encabezado;