import React, { useEffect , useState, useReducer } from "react";
import {Container, Row, Col, Navbar, NavbarBrand, Button} from 'react-bootstrap';
import { useNavigate,useLocation } from "react-router-dom";



import config from '../../config/config.json';

import DesafiosPropuestos from './../../components/paciente/DesafiosPropuestos';
import LateralPersonaje from "../../components/paciente/LateralPersonaje";
import LateralValija from "../../components/paciente/LateralValija";
import Encabezado from "../../components/paciente/Encabezado";
import Menu from './../../components/paciente/Menu';

import Utils from "../../utils/Utils";

function Principal ({persona, setPersona, listaR, setListaR, setToken, comandos}) {

//  const [listaR, setListaR]=useState(persona.paciente.rehabilitaciones);

  const pacienteId=persona.paciente.id;
  const [personaje,setPersonaje] = useState(persona.paciente.personaje);
  const imagen = persona.paciente.personaje.imagen;
  const [miPersonaje, setMiPersonaje] = useState(imagen);

  const navigate = useNavigate();
  const location=useLocation();

  const leerRehabilitaciones=()=>{
    fetch(Utils.getUrl()+'rehabilitaciones/pendientes/'+pacienteId,{
      method: 'GET',
      headers: {
       'Content-Type': 'application/json'
      }
    })
    .then (datos=>datos.json())
    .then (datos=>setListaR(datos.data));
  }
  const leerPersonaje=()=>{
    fetch(Utils.getUrl()+'personajes/'+personaje.id,{
      method: 'GET',
      headers: {
       'Content-Type': 'application/json'
      }
    })
    .then (datos=>datos.json())
    .then (datos=>{
      setPersonaje(datos.data)
    });
  }

  useEffect(()=>{
    leerRehabilitaciones();
    leerPersonaje();
  },[])

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
  //console.log(comandos);
  return (
    <Container fluid>
      <Encabezado persona={persona}/>
      <Row  style={{ paddingTop: '0'}}>
        <Col style={{paddingRight:'0'}}>
          <LateralPersonaje personaje={personaje} cambio={true} pi={personaje.imagen}/>
        </Col>
        <Col xs={6}><DesafiosPropuestos rehabilitaciones={listaR} personajeId={personaje.id}/></Col>
        <Col xs={3} style={{paddingLeft:'0'}}><LateralValija personaje={personaje} cambio={true} pi={personaje.valija}/></Col>
        <Col xs={1} style={{paddingLeft:'0'}}>
          <Menu setToken={setToken} setConfiguracion={comandos.setComandos} configuracion={comandos.comandos} comando={comandos.comandos.control.elemento(comandos)}/>
        </Col>
      </Row>

    </Container>
  );
}

export default Principal;