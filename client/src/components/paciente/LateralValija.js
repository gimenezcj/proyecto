import React from "react";
import { Row, Col, Button} from 'react-bootstrap';

import Valija from "./Valija";

function LateralValija ({valija}) {
  return (
    <>
      <Col>
        <Row style={{background: '#4176FF',textAlign:'center'}}><h4>Insignias ganadas</h4></Row>
        <Row style={{paddingTop: '1vw', textAlign:'center'}}><Valija valija={valija}/></Row>
        <Row style={{paddingTop: '2vw', textAlign: 'center'}}><Col><Button>CAMBIAR DE VALIJA</Button></Col></Row>
      </Col>
    </>
  );
}

export default LateralValija;