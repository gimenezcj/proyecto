import React, { useEffect } from "react";
import {  useFormik } from "formik";
import DatePicker, { registerLocale } from "react-datepicker"
import es from 'date-fns/locale/es';
import { useNavigate } from 'react-router-dom';

import config from '../../config/config.json';
import { Col, Row } from "react-bootstrap";

const okColor='#8f8f9d8f';
const errorColor='red';

export default function FormikRehabilitacion ({rehabilitacion,pacienteId,profesionalId})  {
  const navigate = useNavigate();

  const validate = values => {
    const errors = {}

    if(!values.rehabilitacion.fechaCreacion) errors.fechaCreacion = '(*) El nombre es requerido';
    if(!values.rehabilitacion.fechaHabilitadaDesde) errors.fechaHabilitadaDesde = '(*) El apellido es requerido';
    if(!values.rehabilitacion.fechaHabilitadaHasta) errors.fechaHabilitadaHasta = '(*) El dni es requerido';
  console.log(values);
    return errors;
  }

  const guardar= async(valores) => {

//    if(nuevo) valores.paciente.profesionalId=persona.fonoaudiologo.id;

    fetch( config.SERVER_API_URL+'rehabilitacion/guardar/' + (!rehabilitacion?'nuevo':profesionalId+'/'+pacienteId),{
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(valores)   
    })
      .then(res=>res.json())
      .then(datos=>navigate(-1));
  }

  const formulario=useFormik({
    initialValues:{rehabilitacion:{     
      id:null,
      fechaCreacion:null,
      fechaHabilitadaDesde: null,
      fechaHabilitadaHasta: null,
      dificultad:null,
      escenario: {id:null},
      actividades: []      
    }},validate,
    onSubmit: values => {guardar(values)}
  });

  const fechaFormato = (aDate) => {
    if(!aDate) return null
    else {
      const completo=new Date(aDate);
      const dia = `${(completo.getDate())}`.padStart(2,'0');
      const mes = `${(completo.getMonth()+1)}`.padStart(2,'0');
      const ano = completo.getFullYear();

      return ano+'-'+mes+'-'+dia;
    }
  }

  useEffect(()=>{
    if(rehabilitacion) {
      const aux=rehabilitacion;
      aux.fechaCreacion= fechaFormato(rehabilitacion.fechaCreacion);
      aux.fechaHabilitadaDesde= fechaFormato(rehabilitacion.fechaHabilitadaDesde);
      aux.fechaHabilitadaHasta= fechaFormato(rehabilitacion.fechaHabilitadaHasta);


      formulario.setValues({rehabilitacion});
    }
  },[])


  return (<>
    <form onSubmit={formulario.handleSubmit}>
    <hr/>
    <Row>
      <Col xs><h4>Fechas</h4></Col>
    </Row>
    <Row>
    <Col xs={5}>
      <div  className="form-group"><span style={{width: '10vw'}} >Creacion</span>
        <input tabIndex={1} className='form-field' style={{borderColor:(formulario.errors.dni?errorColor:okColor)}} id="fechaCreacion"
          name="rehabilitacion.fechaCreacion" type='date'
          onChange={formulario.handleChange} value={formulario.values.rehabilitacion.fechaCreacion} required disabled={(rehabilitacion)? "disabled" : ""}/>
      </div>
    </Col>
    </Row>
    <Row>
    <Col xs={5}>
      <div  className="form-group"><span style={{width: '10vw'}} >Desde</span>
        <input tabIndex={1} className='form-field' style={{borderColor:(formulario.errors.dni?errorColor:okColor)}} id="fechaHabilitadaDesde"
          name="rehabilitacion.fechaHabilitadaDesde" type='date'
          onChange={formulario.handleChange} value={formulario.values.rehabilitacion.fechaHabilitadaDesde} required />
      </div>
    </Col>
    <Col xs={1}/>
    <Col xs={5}>
      <div  className="form-group"><span style={{width: '10vw'}} >Hasta</span>
        <input tabIndex={1} className='form-field' style={{borderColor:(formulario.errors.dni?errorColor:okColor)}} id="fechaHabilitadaHasta"
          name="rehabilitacion.fechaHabilitadaHasta" type='date'
          onChange={formulario.handleChange} value={formulario.values.rehabilitacion.fechaHabilitadaHasta} required/>
      </div>
    </Col>

    </Row>
    </form>

 
  </>);
}