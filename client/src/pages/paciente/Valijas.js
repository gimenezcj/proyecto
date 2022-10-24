import React from "react";
import { useState, useEffect } from "react";
import {Container, Row, Col, Navbar, NavbarBrand, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import Encabezado from "../../components/paciente/Encabezado";
import LateralValija from "../../components/paciente/LateralValija";
import ListaValijas from "../../components/paciente/ListaValijas";

function Valijas ({persona, setPersona}) {

  const [personaje] = useState(persona.paciente.personaje);
  const [valijaImagen,setvalijaImagen] = useState (personaje.valija);

  useEffect(()=>{},[valijaImagen]);

  const navigate = useNavigate();

  return (
    <Container fluid>
      <Encabezado persona={persona}/>
      <Row  style={{ paddingTop: '1.5vw'}}>
        <Col style={{paddingRight:'0'}}>
          <LateralValija personaje={personaje} pi={valijaImagen} cambio={false} />
        </Col>
        <Col xs={8}>
          <ListaValijas miValija={valijaImagen} setMiValija={setvalijaImagen} puntajeAcumulado={personaje.puntajeAcumulado}/>
        </Col>
      </Row>
      <div className="fixed-bottom">  
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand><Button variant="primary" size="lg" onClick={()=>navigate("/", { replace: true })}>VOLVER</Button></NavbarBrand>
                </Container>
            </Navbar>
        </div>
    </Container>
  );
}

export default Valijas;