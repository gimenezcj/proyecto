import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ItemRehabilitacion from "./ItemRehabilitacion";

function DesafiosPropuestos ({rehabilitaciones}) {
  return (
    <Container>
      <Col>
        <Row style={{background: '#4176FF', textAlign: 'center'}}>
          <h4>Desafios propuestos</h4>
        </Row>
        <Row style={{marginTop: '1vw', marginLeft: '1vw'}}><ItemRehabilitacion rehabilitacion={rehabilitaciones[0]}/></Row>
      </Col>
      
    </Container>
  );
}

export default DesafiosPropuestos;