import React from "react";
import {Container,Row,Col} from 'react-bootstrap';
import Encabezado from '../components/Encabezado';
import Ingreso from './../components/Ingreso';
import Banner from './../components/Banner';

function Inicio({ setToken,token }) {
    return (
        <Container style={{ background: "#8dadc8", color: "#073763" }}>
      <Row style={{"margin-bottom":"3vh"}}>
        <Col >
          <Encabezado setToken={setToken}  token={token}/>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Te damos la bienvenida a GAMA</h2>
                  <h4>Una plataforma que permite a los pacientes interactuar de manera dinamica e intuitiva sobre los distintos ejercicios de rehabilitacion cognitiva.</h4>
        </Col>
        <Col>
          <Ingreso setToken={setToken}  token={token}/>
        </Col>
            </Row>
            <Row style={{
                "margin-top": "5vh"

            }}>
        <Banner/>
      </Row>
    </Container>
  );
}

export default Inicio;