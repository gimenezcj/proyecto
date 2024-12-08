import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ItemRehabilitacion from "./ItemRehabilitacion";
import PropTypes from 'prop-types';

import '../../pages/estilos/estilos_paciente.css'

DesafiosPropuestos.propTypes = {
  rehabilitaciones: PropTypes.array.isRequired,
  personajeId: PropTypes.number.isRequired,
};
function DesafiosPropuestos ({rehabilitaciones,personajeId}) {
  return (
    <Container>
      <Col>
        <Row style={{background: '#4176FF', textAlign: 'center'}}>
          <h4>Desafios propuestos</h4>
        </Row>
        <div className="cardContainer" style={{maxHeight: '78vh'}}>
          {rehabilitaciones.map(x=><ItemRehabilitacion key={x.id} rehabilitacion={x} personajeId={personajeId}/>)}
        </div>
        {(!rehabilitaciones.length) && <h2>Ud no posee rehabilitaciones pendientes de realizar el dia de hoy</h2>}
      </Col>
      
    </Container>
  );
}

export default DesafiosPropuestos;

//style={{paddingTop: '1vw', paddingLeft:'1vw', background: 'red', height: '78vh'}}