import React, { useEffect, useState } from "react";
import Encabezado from '../../components/paciente/Encabezado'
import Menu from "../../components/profesional/Menu";
import config from '../../config/config.json';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import {Row, Col, Button, Image, Container} from 'react-bootstrap';

export default function Estadisticas ({rehabilitacion,profesional,setToken}) {

    const location=useLocation();
    const pacienteId=(!location.state.pacienteId?0:location.state.pacienteId);
    const [paciente,setPaciente]=useState(null);

    useEffect(()=>{
        setPaciente(profesional.fonoaudiologo.pacientes.filter(x=>x.id===pacienteId)[0]);        
      },[])
    useEffect(()=>{
        console.log(rehabilitacion);
    },[paciente])

    return (<>
        <Encabezado  persona={profesional}/>
        <Menu setToken={setToken} titulo="Estadisticas de la rehabilitacion" botones={config.BOTONES.RECORRIDO+config.BOTONES.TAREA+config.BOTONES.ESTADISTICA+config.BOTONES.VOLVER} iconoVentana='estadisticas.png'/>
        <Container style={{ fontSize: '1vw', maxWidth: '95%'}}>
            <Row style={{ marginTop: '2vh' }} >
                {(paciente!=null) && <>
                <Col ><span style={{fontSize:'2vw'}}>Paciente: </span><span style={{fontSize:'2.5vw'}}>{paciente.persona.nombre} {paciente.persona.apellido}</span></Col>
                </>}
            </Row>
            <Row>
                <Col><span style={{fontSize:'1vw'}}>Resultado de la rehabilitacion: </span>
                </Col>
            </Row>
        </Container>
    </>);
}