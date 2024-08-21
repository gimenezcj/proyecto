import React, { useState, useEffect } from "react";
import {Container, Row, Col, Navbar, NavbarBrand, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import Encabezado from "../../components/paciente/Encabezado";
import LateralPersonaje from "../../components/paciente/LateralPersonaje";
import ListaPersonajes from "../../components/paciente/ListaPersonajes";

function Personajes ({persona, setPersona}) {

  Personajes.propTypes = {
    persona: PropTypes.object.isRequired
  }

  const [personaje] = useState(persona.paciente.personaje);
  const [personajeImagen,setPersonajeImagen] = useState (personaje.imagen);

  useEffect(()=>{},[personajeImagen]);

  const navigate = useNavigate();

  return (
    <Container fluid>
      <Encabezado persona={persona}/>
      <Row  style={{ paddingTop: '1.5vw'}}>
        <Col style={{paddingRight:'0'}}>
          <LateralPersonaje personaje={personaje} pi={personajeImagen} cambio={false} />
        </Col>
        <Col xs={9}>
          <ListaPersonajes miPersonaje={personajeImagen} setMiPersonaje={setPersonajeImagen} puntajeAcumulado={personaje.puntajeAcumulado}/>
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

export default Personajes;