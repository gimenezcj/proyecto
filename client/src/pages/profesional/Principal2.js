import React, { useState } from "react";
import {Container, Navbar, NavbarBrand, Button} from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

import config from '../../config/config.json';
import Encabezado from "../../components/paciente/Encabezado";

function Principal2 ({persona, setToken}) {

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

export default Principal2;