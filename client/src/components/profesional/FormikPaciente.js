import React from "react";
import { Col, Row } from "react-bootstrap";

export default function FormikPaciente ({paciente,setPaciente})  {
  return (<>
    <Row>Datos Personales
    </Row>
    <Row>
      <Col>DNI</Col><Col>paciente</Col>
    </Row>
  </>);
}