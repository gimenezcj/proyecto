import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from 'react-router-dom';

import Encabezado from '../../components/paciente/Encabezado'
import Menu from "../../components/profesional/Menu";
import config from '../../config/config.json';

import '../../pages/estilos/estilos_forms.css';

import { CSSTransition } from "react-transition-group";
import DatePicker, { registerLocale } from "react-datepicker"
import es from 'date-fns/locale/es';
import {  useFormik } from "formik";
import {  Container, Col, Row, Button } from "react-bootstrap";

registerLocale("es",es)

const okColor='#8f8f9d8f';
const errorColor='red';

export default function NuevoPaciente ({setToken,token,accion,persona}) { 

  const [usuarioValido, setUsuarioValido]= useState('none');

  const verificarNombreUsuario= async (nombre) => {

    const verifica= async (nombre) => {
      fetch(config.SERVER_API_URL+'cuentas/verificar/'+nombre,{
        method: 'GET',
      }).then(data => data.json().then(aux =>setUsuarioValido(aux.encontrado&&(aux.cantidad<=1&&nuevo)?'false':'true')));     
    }

    if (nombre.length<6) setUsuarioValido('none');
    else {
      verifica(nombre);
      
    }
  }

  const [paciente,setPaciente]=useState({
    id:null,idProfesional:null,
    persona:{dni:'',nombre:'',apellido:'',cuenta:{usuario:'',clave:''},contactos:[{id:null,fijo:'',celular:'',email:''}]},
    obraSocial:{numero:'',nombre:'',id:null},
    contacto:{fijo:'',celular:'',email:''},
    evaluaciones:[],
    familiares:[]
  });

  const [nuevo,setNuevo] = useState(true);
  const navigate = useNavigate();
  const location=useLocation();

  const datosPagina= () =>{
    // eslint-disable-next-line default-case
    switch (accion) {
      case 'nuevo': 
        return {titulo: 'Alta de un nuevo paciente', icono:'nuevoPaciente.png'};
      case 'informacion': 
        return {titulo: 'Informacion del paciente',icono:'informacion.png'};
      case 'editar':
        return {titulo: 'Edision del paciente', icono: 'editar.png'};
    }
  }

  const validate = values => {
    const errors = {}

    if(!values.paciente.persona.apellido) errors.apellido = '(*) El nombre es requerido';
    if(!values.paciente.persona.nombre) errors.nombre = '(*) El apellido es requerido';
    if(!values.paciente.persona.dni) errors.dni = '(*) El dni es requerido';
    if(!values.paciente.persona.cuenta.usuario||(usuarioValido!=='true')) errors.usuario = '(*) El usuario es requerido';
    if(!values.paciente.persona.cuenta.clave) errors.clave = '(*) La clave es requerida';

    verificarNombreUsuario(values.paciente.persona.cuenta.usuario);
    
    return errors;
  }

  const cargarDatos= async ()=>{
    if((accion==='informacion' || accion==='editar')){
      return fetch(config.SERVER_API_URL + 'pacientes/'+location.state.id, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'}
      }).then(data => {data.json().then(aux=>{setPaciente(aux.data);formulario.setValues({paciente:aux.data});setNuevo(false);
      })});
    }
  }
  
  const datos=datosPagina();

  const guardar= async(valores) => {

    if(nuevo) valores.paciente.profesionalId=persona.fonoaudiologo.id;

    fetch( config.SERVER_API_URL+'pacientes/guardar/' + (nuevo?'nuevo':valores.paciente.id),{
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify(valores)   
    }).then(res=>{
      res.json().then((aux)=>{
        if(aux.operation==='update'||aux.operation==='new') {
          const token2=token;
          if(aux.operation==='update')
            token2.info.persona.fonoaudiologo.pacientes=token.info.persona.fonoaudiologo.pacientes.filter(x=>x.id!==aux.item.id);
          token2.info.persona.fonoaudiologo.pacientes.push(aux.item);
        }      
      });
      navigate(-1);
    })
  }

  const formulario=useFormik({
    initialValues:{paciente:{
      id:null,idProfesional:null,nroAfiliado:'',
      persona:{dni:'',nombre:'',apellido:'',cuenta:{usuario:'',clave:''},contactos:[{id:null,fijo:'',celular:'',email:''}]},
      obraSocial:{nombre:'',id:null},
      evaluaciones:[],
      familiares:[]
    }},validate,
    onSubmit: values => {guardar(values)}
  });
  
  useEffect(()=>{
    cargarDatos();
  },[])

  useEffect(() => {
    formulario.validateForm();
  }, [usuarioValido]);

    return (
    <>
      <Encabezado  persona={persona}/>
      <Menu setToken={setToken} titulo={datos.titulo} botones={config.BOTONES.CERRAR+config.BOTONES.VOLVER} iconoVentana={datos.icono}/>
      <Container>
        <form onSubmit={formulario.handleSubmit}>
          <hr/>
          <Row>
            <Col xs={6}><h4>Datos Personales</h4></Col>
            <Col><h4>Obra Social</h4></Col>
          </Row>
          <Row>

            <Col xs={4}>
              <div  className="form-group"><span style={{width: '10vw'}} >DNI</span>
              <input tabIndex={1} className='form-field' style={{borderColor:(formulario.errors.dni?errorColor:okColor)}} id="dni" name="paciente.persona.dni" type='number' max={99999999} size={8} min={0} step={1}
                onChange={formulario.handleChange} maxLength={8} minLength={7} value={formulario.values.paciente.persona.dni} required disabled={(!nuevo)? "disabled" : ""}/>
              </div>
            </Col>
            <Col xs={2}></Col>
            <Col>
              <div  className="form-group"><span style={{width: '13vw'}}>Obra Social</span>
              <select tabIndex={4} className='form-field' name="paciente.obraSocial.id" onChange={formulario.handleChange}>
                <option value="1" selected={paciente.obraSocial.id===1}>Sin obra social</option>
                <option value="2" selected={paciente.obraSocial.id===2}>IOMA</option>
                <option value="3" selected={paciente.obraSocial.id===3}>Petroleros</option>
              </select>
              </div>
            </Col>
      
          </Row>
          <Row>
            <Col xs={5}>
            <div className="form-group" style={{width: '100%'}}><span style={{width: '10vw'}}>Apellido</span>
            <input tabIndex={2} className='form-field' style={{borderColor:(formulario.errors.apellido?errorColor:okColor)}} id="apellido" name="paciente.persona.apellido" type='text' size={25} 
                onChange={formulario.handleChange} maxLength={35} value={formulario.values.paciente.persona.apellido} required/>
            </div>
            </Col>
            <Col xs={1}/>
            <Col xs>
            <div className="form-group"><span style={{width: '13vw'}}>Nro.Carnet</span>
            <input tabIndex={5} className='form-field' id="carnet" name="paciente.nroAfiliado" type='text' size={12} 
                onChange={formulario.handleChange} maxLength={12} minLength={7} value={formulario.values.paciente.nroAfiliado} />
            </div>
            </Col> 
          </Row>
    
          <Row>
            <Col xs={5}>
            <div className="form-group"><span style={{width: '10vw'}}>Nombre</span>
            <input tabIndex={3} className='form-field' style={{borderColor:(formulario.errors.nombre?errorColor:okColor)}} id="nombre" name="paciente.persona.nombre" type='text' size={25} 
                onChange={formulario.handleChange}  maxLength={35} value={formulario.values.paciente.persona.nombre} required/>
            </div>
            </Col>
            <Col xs={1}/>
          </Row>
          <hr />
          <Row>
            <Col xs={6}><h4>Cuenta de ingreso</h4></Col>
            <Col><h4>Datos de contacto</h4></Col>
          </Row>
          <Row>
          <Col xs={5}>
            <div className="form-group"><span style={{width: '10vw'}}>Usuario</span>
            <input  tabIndex={7} className='form-field' style={{borderColor:(formulario.errors.usuario?errorColor:okColor)}} id="usuario" name="paciente.persona.cuenta.usuario" type='text' size={8} 
                onChange={formulario.handleChange} maxLength={20} minLength={6} value={formulario.values.paciente.persona.cuenta.usuario} required/>
            </div>
          </Col>
          <Col xs={1}>
            {(usuarioValido!=='none') &&
            <img src={config.ICONOS+(usuarioValido==='true'?'ok':'noOk')+'.png'} alt='estado' style={{width:'3vw'}} /> }
          </Col>
          <Col>
            <div className="form-group"><span style={{width: '10vw'}}>Celuar</span>
            <input  tabIndex={9} className='form-field' id="celular" name="paciente.persona.contactos[0].celular" type='text' size={15} 
                onChange={formulario.handleChange} maxLength={15} minLength={9} value={formulario.values.paciente.persona.contactos[0].celular} />
            </div>
          </Col>
          </Row>
          <Row>
            <Col xs={5}>
            <div className="form-group"><span style={{width: '10vw'}}>Clave</span>
            <input  tabIndex={8} className='form-field' style={{borderColor:(formulario.errors.clave?errorColor:okColor)}} id="clave" name="paciente.persona.cuenta.clave" type='text' size={8} 
                onChange={formulario.handleChange} maxLength={10} minLength={4} value={formulario.values.paciente.persona.cuenta.clave} required/>
            </div>
            </Col>
            <Col xs={1}/>
            <Col>
            <div className="form-group"><span style={{width: '10vw'}}>Fijo</span>
            <input   tabIndex={10} className='form-field' id="fijo" name="paciente.persona.contactos[0].fijo" type='text' size={15} 
                onChange={formulario.handleChange} maxLength={15} minLength={9} value={formulario.values.paciente.persona.contactos[0].fijo} />
            </div>
            </Col>
          </Row>
          <Row>
            <Col xs={6}></Col>
            <Col>
            <div className="form-group"><span style={{width: '10vw'}}>Email</span>
            <input  tabIndex={11} className='form-field' id="email" name="paciente.persona.contactos[0].email" type='email' size={15} 
                onChange={formulario.handleChange} maxLength={25} minLength={7} value={formulario.values.paciente.persona.contactos[0].email} />
            </div>
            </Col>

          </Row>
          <Row>
            <Col><div className="action"><button className="action-button" type="submit"  tabIndex={50}>{(nuevo?'Guardar los datos del nuevo paciente':'Actualizar los datos del paciente')}</button></div></Col>
            
          </Row>
        </form>
      </Container>

    </>
  );
}