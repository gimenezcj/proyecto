import React from "react";
import { useState } from "react";
import {Container, Row, Col, Navbar, NavbarBrand, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


import config from '../../config/config.json';

import DesafiosPropuestos from './../../components/paciente/DesafiosPropuestos';
import LateralPersonaje from "../../components/paciente/LateralPersonaje";
import LateralValija from "../../components/paciente/LateralValija";
import Encabezado from "../../components/paciente/Encabezado";

function Principal ({persona, setPersona, setToken}) {

  const pacienteId=persona.paciente.id;
  const [personaje,setPersonaje] = useState(persona.paciente.personaje);





  const imagen = persona.paciente.personaje.imagen;
  const [miPersonaje, setMiPersonaje] = useState(imagen);
  

  const navigate = useNavigate();

  async function logout() {
    return fetch(config.SERVER_API_URL + 'cuentas/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }).then(data => data.json())
   }
   
  const salir = async e => {
    const token = await logout();
    setToken(token); 
    navigate("/", { replace: true });
  }
  
  return (
    <Container fluid>
      <Encabezado persona={persona}/>
      <Row  style={{ paddingTop: '1.5vw'}}>
        <Col style={{paddingRight:'0'}}>
          <LateralPersonaje personaje={personaje} cambio={true} pi={personaje.imagen}/>
        </Col>
        <Col xs={5}><DesafiosPropuestos rehabilitaciones={persona.paciente.rehabilitaciones}/></Col>
        <Col xs={4} style={{paddingLeft:'0'}}><LateralValija valija={personaje.valija}/></Col>
      </Row>
      <div className="fixed-bottom">  
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand><Button variant="primary" size="lg" onClick={salir}>SALIR</Button></NavbarBrand>
                </Container>
            </Navbar>
        </div>
    </Container>
  );
}

export default Principal;