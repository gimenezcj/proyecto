import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


import config from '../../config/config.json';

function Principal ({persona, setToken}) {

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
    navigate("/");
  }
  
  return (
    <Container fluid>
      <Row>
       <h2> Hola {persona.nombre} {persona.apellido} ud. no figura como paciente. Por favor pongase en contacto con su medico</h2>
      </Row>
      <Row>
        <Button variant="primary" size="lg" onClick={salir}>SALIR</Button>
      </Row>
    </Container>
    
  );
}

export default Principal;
