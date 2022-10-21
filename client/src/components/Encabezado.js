import React from "react";
import {Nav,Image,Container,Row,Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import {token}  from './useToken';
import config from '../config/config.json';

function Encabezado ({setToken,token}) {





  const icon =
    <span>
      <img src="/imagenes/base/logo.png" alt="logo GAMA" width="120 px"/>
    </span>

  return (

    <Container>
<Row><Col md={2} style={{"display":"flex","align-items":"center"}}>{icon}</Col><Col md={10}>
    <Nav className="flex-row justify-content-end" activeKey="/home" >


          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/QES">Que es GAMA</Nav.Link>
          <Nav.Link href="/Funcionalidades">Funcionalidades</Nav.Link>

          <Nav.Link eventKey="link-2">Contacto</Nav.Link>

    </Nav>
    </Col>
    </Row>
    </Container>
  )
}

export default Encabezado;
