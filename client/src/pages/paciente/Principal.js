import React, { useEffect } from "react";
import { useState } from "react";
import {Container, Row, Col, Navbar, NavbarBrand, Button} from 'react-bootstrap';
import { useNavigate,useLocation } from "react-router-dom";


import config from '../../config/config.json';

import DesafiosPropuestos from './../../components/paciente/DesafiosPropuestos';
import LateralPersonaje from "../../components/paciente/LateralPersonaje";
import LateralValija from "../../components/paciente/LateralValija";
import Encabezado from "../../components/paciente/Encabezado";

import Utils from "../../utils/Utils";

function Principal ({persona, setPersona, listaR, setListaR, setToken}) {

//  const [listaR, setListaR]=useState(persona.paciente.rehabilitaciones);

  const pacienteId=persona.paciente.id;
  const [personaje,setPersonaje] = useState(persona.paciente.personaje);
  const imagen = persona.paciente.personaje.imagen;
  const [miPersonaje, setMiPersonaje] = useState(imagen);

  const navigate = useNavigate();
  const location=useLocation();


//  useEffect(()=>{
//    if(location.state!==null)
//      if(location.state.accion) {     
//        const {accion}=location.state;
//      if(accion==='volverDesafioCompleto' || accion==='volverDesafioInCompleto')        
//        {
//          const {actividadId,rehabilitacionId,resultadoActividad}=location.state;
//          const indice=persona.paciente.rehabilitaciones.findIndex(x=>x.id===rehabilitacionId);
//          if(accion==='volverDesafioCompleto'){          
//            if(persona.paciente.rehabilitaciones[indice].actividades2.length===1){
//              
//              setListaR(persona.paciente.rehabilitaciones.filter(x=>x.id!==rehabilitacionId));
//            }
//            else {
//                persona.paciente.rehabilitaciones[indice].actividades2=persona.paciente.rehabilitaciones[indice].actividades2.filter(x=>x.id!=actividadId);
//                setListaR(persona.paciente.rehabilitaciones);
//              }
//              //setToken(token);
////            setPersona(persona);          
////            setToken({...token,info:{...token.info,persona:persona}});
//          }
////          elemento.resultadosActividades.push(resultadoActividad);
//        }
//    }
//  },[])
  const leerRehabilitaciones=()=>{
    fetch(configUtils.getUrl()+'rehabilitaciones/pendientes/'+pacienteId,{
      method: 'GET',
      headers: {
       'Content-Type': 'application/json'
      }
    })
    .then (datos=>datos.json())
    .then (datos=>setListaR(datos.data));
  }
  const leerPersonaje=()=>{
    fetch(config.Utils.getUrl()+'personajes/'+personaje.id,{
      method: 'GET',
      headers: {
       'Content-Type': 'application/json'
      }
    })
    .then (datos=>datos.json())
    .then (datos=>{
//      console.log(datos);
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
  
  return (
    <Container fluid>
      <Encabezado persona={persona}/>
      <Row  style={{ paddingTop: '1.5vw'}}>
        <Col style={{paddingRight:'0'}}>
          <LateralPersonaje personaje={personaje} cambio={true} pi={personaje.imagen}/>
        </Col>
        <Col xs={6}><DesafiosPropuestos rehabilitaciones={listaR} personajeId={personaje.id}/></Col>
        <Col xs={3} style={{paddingLeft:'0'}}><LateralValija personaje={personaje} cambio={true} pi={personaje.valija}/></Col>
      </Row>
      <div className="fixed-bottom">  
            <Navbar color="dark" dark='true'>
                <Container>
                    <NavbarBrand><Button variant="primary" size="lg" onClick={salir}>SALIR</Button></NavbarBrand>
                </Container>
            </Navbar>
        </div>
    </Container>
  );
}

export default Principal;