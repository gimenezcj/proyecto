import React, { useEffect, useState } from "react";
import Encabezado from "../../components/paciente/Encabezado";
import Menu from "../../components/profesional/Menu";
import config from '../../config/config.json';
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import FormikRehabilitacion from "../../components/profesional/FormikRehabilitacion";

export default function Rehabilitacion ({rehabilitacion,profesional,setToken}) { 
    
  const location=useLocation();
  const pacienteId=(!location.state.pacienteId?0:location.state.pacienteId);
  const [paciente,setPaciente]=useState(null);

    useEffect(()=>{
      setPaciente(profesional.fonoaudiologo.pacientes.filter(x=>x.id===pacienteId)[0]);
    },[])

    return (
      <>
        <Encabezado  persona={profesional}/>
        <Menu setToken={setToken}  botones={config.BOTONES.CERRAR+config.BOTONES.VOLVER} iconoVentana='rehabilitaciones.png'
                titulo={!rehabilitacion ? 'Nueva rehabilitacion' : 'Informacion de la rehabilitacion'} />
            <Container style={{
                fontSize: '1vw'
            }}>
          <Row>
                    <Col style={{ marginTop: '2vh', display: 'flex', alignItems: 'baseline'}}><h3>Paciente:_</h3><h2>{paciente?paciente.persona.nombre:''} {paciente?paciente.persona.apellido:''}</h2></Col>
          </Row>      
          <FormikRehabilitacion rehabilitacion={rehabilitacion} pacienteId={!paciente?null:paciente.id} profesionalId={profesional.id}/>
        </Container>
      </>)
}