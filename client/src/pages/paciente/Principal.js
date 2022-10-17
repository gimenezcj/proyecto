import React from "react";
import {Container, Row, Col,Image, Navbar, NavbarBrand, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


import config from '../../config/config.json';

import DesafiosPropuestos from './../../components/paciente/DesafiosPropuestos';
import LateralPersonaje from "../../components/paciente/LateralPersonaje";
import LateralValija from "../../components/paciente/LateralValija";

function Principal ({persona, setToken}) {

  const navigate = useNavigate();

  async function logout() {
    return fetch(config.SERVER_API_URL + 'usuario/logout', {
      method: 'GET',
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
      <Row>
        <Col><Image src={"/imagenes/base/logo.png"} style={{height:'6vw'}}/></Col>
        <Col xs={6}><h2 style={{textAlign: "center",fontSize: '2.7vw', paddingTop: '2.7vw'}}>Hola, bienvenido {persona.nombre} {persona.apellido}</h2></Col>
        <Col style={{display:'flex', justifyContent:'right'}}><Image  src={"/imagenes/base/logoCodapli.png"} style={{height:'6vw'}}/> <Image  src={"/imagenes/base/logoUtn.png"} style={{height:'6vw'}}/></Col>
      </Row>
      <Row  style={{ paddingTop: '1.5vw'}}>
        <Col style={{paddingRight:'0'}}>
          <LateralPersonaje personaje={persona.paciente.personaje}/>
        </Col>
        <Col xs={5}><DesafiosPropuestos rehabilitaciones={persona.paciente.rehabilitaciones}/></Col>
        <Col xs={4} style={{paddingLeft:'0'}}><LateralValija valija={persona.paciente.personaje.valija}/></Col>
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