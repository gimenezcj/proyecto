import React from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import config from '../../config/config.json';
import { propTypes } from "react-bootstrap/esm/Image";
import Utils from "../../utils/Utils";


function Principal ({persona, setToken}) {

  Principal.propTypes = {
    persona:propTypes.object.isRequired
  }

  const navigate = useNavigate();
  
  async function logout() {
    return fetch(Utils.getUrl()+ 'cuentas/logout', {
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
