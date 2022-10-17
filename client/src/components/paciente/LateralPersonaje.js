import React from "react";
import { Row, Col, Button} from 'react-bootstrap';

import Puntaje from "./Puntaje";
import Personaje from "./Personaje";

function LateralPersonaje ({personaje}) {
  return (
    <>
      <Col>
        <Row style={{background: '#4176FF',textAlign:'center'}}><Puntaje puntaje={personaje.puntajeAcumulado}/></Row>
        <Row style={{paddingTop: '1vw', textAlign:'center'}}><Personaje personaje={personaje}/></Row>
        <Row style={{paddingTop: '2vw', textAlign: 'center'}}><Col><Button>CAMBIAR DE PERSONAJE</Button></Col></Row>
      </Col>
    </>
  );
}

export default LateralPersonaje;