import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ItemRehabilitacion from "./ItemRehabilitacion";

import '../../pages/estilos/estilos_paciente.css'

function DesafiosPropuestos ({rehabilitaciones}) {
  return (
    <Container>
      <Col>
        <Row style={{background: '#4176FF', textAlign: 'center'}}>
          <h4>Desafios propuestos</h4>
        </Row>
        <div className="cardContainer" style={{maxHeight: '78vh'}}>
          {rehabilitaciones.map(x=><ItemRehabilitacion rehabilitacion={x}/>)}
        </div>
      </Col>
      
    </Container>
  );
}

export default DesafiosPropuestos;

//style={{paddingTop: '1vw', paddingLeft:'1vw', background: 'red', height: '78vh'}}