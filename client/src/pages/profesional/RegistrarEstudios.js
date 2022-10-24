
//const RegistrarEstudios2 = () => {
  //  return (
    //    <>
   //     Estudios 
    //    </>
   // )
//}

//export default RegistrarEstudios2;

import React, { useEffect, useState}  from 'react'
import { useFormik } from 'formik'
import DatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import Alert from "react-bootstrap/Alert";
import { CSSTransition } from "react-transition-group";
import es from 'date-fns/locale/es';
import { useLocation, useParams } from 'react-router-dom';
registerLocale("es",es)


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
   
    return {
      ...styles,
      backgroundColor: isDisabled ? 'red' : 'blue',
      color: '#FFF',
      cursor: isDisabled ? 'not-allowed' : 'default',
     
    };
  },
 
};




export function RegistrarEstudios (row) {
const location=useLocation();





  const validate = values => {
    const errors = {}

    if(!values.fecha) {
      errors.fecha = 'Fecha es requerido';
    }
    if(!values.nombre_apellido) {
      errors.nombre_apellido = 'Nombre y Apellido es requerido';
    }
    if(!values.observaciones) {
      errors.observaciones = 'observaciones es requerido';
    }
    if(!values.lugar) {
      errors.lugar = 'Lugar es requerido';
    }    

    return errors;
  }
;
  
 const [isValid, setIsValid] = useState(false);

 const [showMessage, setShowMessage] = useState(false);

 const [mensajeTexto, setMensajeTexto] = useState("");

 const [mensajeHeading, setMensajeHeading] = useState("");

 const [showButton, setShowButton] = useState(true);

 const wizard= location ? location.state: {_id:100,fecha:'2022-10-10',nombre_apellido:'',observaciones:'',lugar:''};
 
 const formik = useFormik({  

  
    initialValues: {  
        id:wizard?._id,     
        fecha: fecha(wizard?.fecha),
        nombre_apellido: wizard?.nombre_apellido,
        observaciones:wizard?.observaciones,
        lugar:wizard?.lugar
      },
    validate,


    onSubmit: values => {
      console.log(values)
      
      const requestOptions = {
        method: 'POST',
        headers: {
          //  'Content-Type': 'application/json'
         'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(values)
        
     
      };
      if (values.id===undefined){        
        setMensajeHeading("Alta");
       //var url = new URL(REACT_APP_URL_WEB_SERVICES+'RegAccidenteWS.asmx/SetInsertRegistrosAccidentes');
      }else{
        setMensajeHeading("Modificación");
        //  var url = new URL(REACT_APP_URL_WEB_SERVICES+'RegAccidenteWS.asmx/SetUpdateRegistrosAccidentes');
      }
     fetch("",requestOptions)
       .then(function() {
            console.log("ok"); setShowMessage(true);  setMensajeTexto("Se realizó de forma exitosa");
        }).catch(function() {
            console.log("error"); setShowMessage(true);   setMensajeTexto("Error");
        });
    }
  })

  const maxLengthCheck = (object) => {
    console.log(object.target.value.length);
    console.log(object.target.maxLength);
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
    }

 
   function fecha (object){
    if (object===undefined){
      return new Date();
      }else{
        return new Date(object);
      }

   } 

   function horaminutos (object,object1,object2){
    if (object===undefined){
      return '';
      }else{
        let hora;
        let minutos;
        if (object1<10) {
               if (object1===0){
                    hora='00'; 
               }else{
                    hora='0'+object1; 
               }
        }else{
          hora=object1; 

        }

        if (object2<10) {
              if (object2===0){
                  minutos='00'; 
              }else{
                  minutos='0'+object2; 
              }
        }else{
          minutos=object2; 
        }

        return hora+':'+minutos;
      }

   } 
   

return (

<div className="container">  
<div className="py-3">          
        </div>
        <CSSTransition
        in={showMessage}
        timeout={600}
        classNames="alert"
        unmountOnExit
        onEnter={() => setShowButton(false)}
        onExited={() => setShowButton(true)}
      >
        <Alert
          variant="primary"
         
        >
          <Alert.Heading>{mensajeHeading}</Alert.Heading>
          <p>{mensajeTexto}</p> 
        <div className="py-3">  
         
        </div>
           
        </Alert>
      </CSSTransition>

  <form onSubmit={formik.handleSubmit} noValidate>    
  <div class="row justify-content-left my-3">
    <div class="col-md-3 text-left">
      {showButton && (
          <button type="submit" className="btn btn-cian btn-width">Guardar</button>
          )}
    </div>
    
  </div>


  <div id="main-content">      
    <div className="row justify-content-center py-3">
        <div className="col">
          <h2>Estudios<small className="fw-bold"></small></h2>
        </div>              
    </div>       
  </div>

  <div className="card mb-3" >
    <div className="card-body">
      <h5 className="card-title"></h5>
      <div className="row">
        <div className="col-md-3">
          <label htmlFor="fecha" className="form-label">
           Fecha 
          </label>
            <DatePicker 
              selected={formik.values.fecha}
              dateFormat="yyyy/MM/dd"
              className="form-control" locale={es} 
              name="fecha"
              onChange={date => formik.setFieldValue('fecha', date)}
            />
        </div>        
        <div className="col-md-3">
          <label htmlFor="nombre_apellido" className="form-label">Médico</label>
          <input
            id="nombre_apellido"
            name="nombre_apellido"
            type="text"
            className="form-control"  min="0" step="1"
            onChange={formik.handleChange} maxLength="180" 
            value={formik.values.medico} required/>
          {formik.errors.medico ? <div className='error alert alert-danger'>{formik.errors.medico}</div> : null}
        </div>       
        <div className="col-md-3">
          <label htmlFor="observaciones" className="form-label">Observaciones</label>
          <input
            id="observaciones"
            name="observaciones"
            type="text"
            className="form-control"  min="0" step="1"
            onChange={formik.handleChange} maxLength="180" 
            value={formik.values.observaciones} required/>
          {formik.errors.observaciones ? <div className='error alert alert-danger'>{formik.errors.observaciones}</div> : null}
        </div>  
        <div className="col-md-3">
          <label htmlFor="lugar" className="form-label">Lugar</label>
          <input
            id="lugar"
            name="lugar"
            type="text"
            className="form-control"  min="0" step="1"
            onChange={formik.handleChange} maxLength="180" 
            value={formik.values.lugar} required/>
          {formik.errors.lugar ? <div className='error alert alert-danger'>{formik.errors.lugar}</div> : null}
        </div>  
     {/*    <div className="col-md-3">
          <label htmlFor="id" className="form-label">Estudio</label>
          <input
            id="id"
            name="id"
            type="file"
            className="form-control"  min="0" step="1"
            onChange={formik.handleChange} maxLength="7" onInput={maxLengthCheck}
            value={formik.values.id} required/>
          {formik.errors.id ? <div className='error alert alert-danger'>{formik.errors.id}</div> : null}
        </div>
        

       <div className="col-md-3">
            <label htmlFor="minutosAccidente" className="form-label">Minutos</label>
          <input id="minutosAccidente"    
            name="minutosAccidente" 
            className="form-control"
            type="time"  
            onChange={formik.handleChange} onInput={maxLengthCheck} min={0} max={60}
            value={formik.values.minutosAccidente} required />
          {formik.errors.minutosAccidente ? 
          <div className='error alert alert-danger'>{formik.errors.minutosAccidente}</div> : null}
        </div>*/}
    
      </div>
    </div> 
  </div>
 
  
 
 

 
</form>

       
</div>
  )
}
export default RegistrarEstudios;