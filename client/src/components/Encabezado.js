import React from "react";
import {Nav,Image,Container,Row,Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import {token}  from './useToken';
import config from '../config/config.json';

function Encabezado ({setToken,token}) {





  const icon =
    <span>
      <img src="/imagenes/base/logo.png" alt="logo GAMA" width="200vw"/>
    </span>

  return (

    <Container>
<Row><Col md={2} style={{"display":"flex","align-items":"center"}}>{icon}</Col><Col md={10}>
   
    </Col>
    </Row>
    </Container>
  )
}

export default Encabezado;
