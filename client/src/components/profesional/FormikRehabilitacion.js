import React, { useEffect, useState } from "react";
import {   useFormik } from "formik";
import es from 'date-fns/locale/es';
import { useNavigate } from 'react-router-dom';

import config from '../../config/config.json';
import { Button, Col, Image, Row,Alert } from "react-bootstrap";
import '../../pages/estilos/estilos_forms.css';

const okColor='#8f8f9d8f';
const errorColor='red';

export default function FormikRehabilitacion ({rehabilitacion,pacienteId,profesionalId, escenarios})  {
  const [actividades,setActividades]=useState([]);
  const navigate = useNavigate();

  const validate = values => {
    const errors = {}

    if(!values.rehabilitacion.escenario.id) errors.escenario='Hay que seleccionar un escenario';
    if(!values.rehabilitacion.actividades2.length===0) errors.actividades='Al menos debe haber una actividad seleccionadad'

    if(!values.rehabilitacion.fechaHabilitadaDesde) errors.fechaHabilitadaDesde = '(*) La fecha desde es requerida';
    if(!values.rehabilitacion.fechaHabilitadaHasta) errors.fechaHabilitadaHasta = '(*) La fecha hasta es requerida';

    if(listaActividades.id!==parseInt(values.rehabilitacion.escenario.id)) {
      const e=escenarios.filter(x=>parseInt(values.rehabilitacion.escenario.id)===x.id);
      if (e.length===1){
        setListaActividades({id:e[0].id,lista:e[0].actividadesDisponibles});
        
        formulario.values.rehabilitacion.actividades2=values.rehabilitacion.actividades2.map(x=>{return {actividadDisponible:{id:1}}});
      }
    }

    return errors;
  }

  const [listaEscenarios,setListaEscenarios]= useState([]);
  const [listaActividades,setListaActividades]= useState({id:null,lista:[]});

  useEffect(()=>{
    if(escenarios) 
      setListaEscenarios(escenarios.map(x => {return {id:x.id, nombre:x.nombre, descripcion:x.descripcion}}));
  },[escenarios])


  const guardar= async(valores) => {

//    if(nuevo) valores.paciente.profesionalId=persona.fonoaudiologo.id;

    fetch( config.SERVER_API_URL+'rehabilitaciones/guardar/' + (!rehabilitacion?'nueva/'+profesionalId+'/'+pacienteId:'actualizar'),{
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(formulario.values)
    })
      .then(res=>res.json())
      .then(datos=>navigate(-1));
//      console.log(formulario.values.rehabilitacion);
  }

//  const guardar2= async(valores)=>{
//    console.log(formulario.values.rehabilitacion);
//  }

  const formulario=useFormik({
    initialValues:{rehabilitacion:{   
      fonoaudiologoId:profesionalId,        
      id:null,
      fechaCreacion:null,
      fechaHabilitadaDesde: null,
      fechaHabilitadaHasta: null,
      dificultad:null,
      escenario: {id:null},
      actividades2: []      
    }},validate,
    onSubmit: values => {guardar(values)}
  });

  const fechaFormato = (aDate) => {
    if(!aDate) return null
    else {
      const completo=new Date(aDate);
      completo.setDate(completo.getDate() +1 );
      const dia = `${(completo.getDate())}`.padStart(2,'0');
      const mes = `${(completo.getMonth()+1)}`.padStart(2,'0');
      const ano = completo.getFullYear();

      return ano+'-'+mes+'-'+dia;
    }
  }

  
  useEffect(()=>{
    if(rehabilitacion) {
      const aux=rehabilitacion;
//      aux.fechaCreacion= fechaFormato(rehabilitacion.fechaCreacion);
      aux.fechaHabilitadaDesde= fechaFormato(rehabilitacion.fechaHabilitadaDesde);
      aux.fechaHabilitadaHasta= fechaFormato(rehabilitacion.fechaHabilitadaHasta);
      rehabilitacion.actividades2.sort((a,b)=>a.orden>b.orden);
      formulario.setValues({rehabilitacion});
    }
  },[])


  const formikActualizarActividades=()=>{
//    formulario.setFieldValue("number", someNumber)
  }

  const nuevaActividad=()=>{
    if(formulario.values['rehabilitacion']['actividades2'].length<3){
      formulario.setFieldValue("rehabilitacion.actividades2",formulario.values['rehabilitacion']['actividades2'].concat({id:null,actividadDisponible:{id:null}}));
    }
  }

  const eliminarActividad=(k)=>{
    const antes=formulario.values['rehabilitacion']['actividades2'].slice(0,k);
    const despues=formulario.values['rehabilitacion']['actividades2'].slice(k+1,formulario.values['rehabilitacion']['actividades2'].length);
    formulario.setFieldValue("rehabilitacion.actividades2",antes.concat(despues));
  }

  const ordinal=(n)=>{
    // eslint-disable-next-line default-case
    switch (n) {
      case 1: return '1ro';
      case 2: return '2do';
      case 3: return '3ro';
    }
  }


  return (<>
    <form onSubmit={formulario.handleSubmit}>
    <hr/>
    <Row>
      <Col xs><span style={{fontSize: '2vw'}}>Fechas</span></Col>
    </Row>

    <Row>
    <Col xs={5}>
      <div  className="form-group"><span style={{width: '10vw'}} >Desde</span>
        <input tabIndex={2} className='form-field' style={{borderColor:(formulario.errors.dni?errorColor:okColor)}} id="fechaHabilitadaDesde"
          name="rehabilitacion.fechaHabilitadaDesde" type='date' disabled={formulario.values.rehabilitacion.realizada}
          onChange={formulario.handleChange} value={formulario.values.rehabilitacion.fechaHabilitadaDesde} required />
      </div>
    </Col>
    <Col xs={1}/>
    <Col xs={5}>
      <div  className="form-group"><span style={{width: '10vw'}} >Hasta</span>
        <input tabIndex={3} className='form-field' style={{borderColor:(formulario.errors.dni?errorColor:okColor)}} id="fechaHabilitadaHasta"
          name="rehabilitacion.fechaHabilitadaHasta" type='date' disabled={formulario.values.rehabilitacion.realizada}
          onChange={formulario.handleChange} value={formulario.values.rehabilitacion.fechaHabilitadaHasta} required/>
      </div>
    </Col>
    </Row>
    <hr/>
    <Row>
      <Col >
        <div  className="form-group" style={{minWidth:'100%'}} ><span style={{width: '10vw'}} >Escenario</span>
        <select required tabIndex={4} className='form-field' name="rehabilitacion.escenario.id"  style={{borderColor:(formulario.errors.escenario?errorColor:okColor)}}
          onChange={formulario.handleChange} disabled={formulario.values.rehabilitacion.realizada} >
        {(!rehabilitacion && !listaActividades.id) &&
          <option value={-1} selected>Seleccione un escenario</option>
        }
        {listaEscenarios.map(x=>
            <>
            <option value={x.id} selected={rehabilitacion && x.id===rehabilitacion.escenario.id}>{x.nombre} - {x.descripcion}</option>
            </>)}
              </select>
        </div>
      </Col>
      
    </Row>
    <hr/>{}
    {!formulario.values.rehabilitacion.realizada &&
    <Row style={{display: 'flex', alignItems:'end'}}><Col><span  style={{fontSize: '2vw'}}>Actividades</span><span style={{fontSize: '1.5vw'}}> (Hasta 3)</span></Col>
      <Col xs={1}> <Button className="botonIcono" onClick={nuevaActividad} style={{borderColor:(formulario.errors.actividades?errorColor:okColor)}}
        disabled={!listaActividades.id||formulario.values.rehabilitacion.actividades2.length>2}><Image src={config.ICONOS+'nuevaActividad.png '} width='23vw'/></Button></Col>     
    </Row>}
    


    {(formulario.values['rehabilitacion']['actividades2']) &&
      formulario.values['rehabilitacion']['actividades2'].map((v,k)=>{
      return(
      <>
<Row>
  <Col>
  <div  className="form-group" style={{minWidth:'100%'}} ><span style={{width: '5vw'}} >{ordinal(k+1)}</span>
        <select tabIndex={5+k} className='form-field' name={"rehabilitacion.actividades2["+k+"].actividadDisponible.id"} onChange={formulario.handleChange} 
          disabled={formulario.values.rehabilitacion.realizada}>
          {!formulario.values['rehabilitacion']['actividades2'][k].id &&
          <option value={-1} selected>Seleccione una actividad</option>
          }
          {listaActividades.lista.map(x=>
            <>
            <option value={x.id} selected={parseInt(formulario.values['rehabilitacion']['actividades2'][k].actividadDisponible.id)===x.id}>{x.nombre}</option>
            </>)}
        </select>
        </div>
        </Col>
        {(!formulario.values.rehabilitacion.realizada) &&
  <Col xs={2} style={{display: 'flex', justifyContent:'flex-end', width: 'inherit'}}>
    <Button className="botonIcono" variant="primary" disabled ><Image src={config.ICONOS+'configurar.png '} width='15vw'/></Button>
    <Button className="botonIcono" variant="danger" onClick={()=>eliminarActividad(k)}><Image src={config.ICONOS+'papelera.png '} width='15vw'/></Button>
  </Col>}
</Row>
      </>);
    })}
    <Row>
      {!formulario.values.rehabilitacion.realizada &&
        <Col><div className="action d-grid gap-2" ><Button style={{fontSize:'2vw'}} type="submit"  tabIndex={50} >
          {(!rehabilitacion?'Guardar nueva rehabilitacion':'Actualizar rehabilitacion')}</Button></div></Col>            
      }
      {formulario.values.rehabilitacion.realizada &&
        <Col style={{marginTop:'2vh'}}><Alert  variant='success'><Alert.Heading>La actividad realizada</Alert.Heading></Alert></Col>            
      }

    </Row>    
  </form>
  </>);
}


//variant={(!formulario.errors!=={})?'warning':'primary'}

// <Row>
// <Col xs={5}>
//   <div  className="form-group"><span style={{width: '10vw'}} >Creacion</span>
//     <input tabIndex={1} className='form-field' style={{borderColor:(formulario.errors.dni?errorColor:okColor)}} id="fechaCreacion"
//       name="rehabilitacion.fechaCreacion" type='date'
//       onChange={formulario.handleChange} value={formulario.values.rehabilitacion.fechaCreacion} required disabled={(rehabilitacion)? "disabled" : ""}/>
//   </div>
// </Col>
// </Row>