import React, { useEffect, useState } from "react";
import {Button, Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';

import '../../pages/estilos/estilos_paciente.css';

const time = require( '../../modules/Time');

function ItemRehabilitacion ({rehabilitacion, personajeId}) {
  const navigate= useNavigate();
  const [idResultadoActividad, setIdResultadoActividad]= useState(null);
  const [idResultadoRecorrido, setIdResultadoRecorrido]= useState(null);
  const [actividadActual, setActividadActual]= useState(null);

//Llamadas a la api
const IniciarActividad=()=>{
  if(actividadActual!=null)
  fetch(config.SERVER_API_URL+'rehabilitaciones/actividad/'+actividadActual.id+'/inicia',{
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    }
  })
  .then (datos=>datos.json())
  .then (datos=>{
    setIdResultadoActividad(datos.idResultadoActividad);
    IniciarRecorrido(datos.idResultadoActividad)
  });
}

const IniciarRecorrido=(idResultadoActividad)=>{
  if(idResultadoActividad!=null)
  fetch(config.SERVER_API_URL+'rehabilitaciones/resultadoActividad/'+idResultadoActividad+'/iniciaRecorrido',{
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}
  })
  .then (datos=>datos.json())
  .then (datos=>{
    setIdResultadoRecorrido(datos.idResultadoRecorrido);
    navigate("/recorrido", { state:{actividad:actividadActual,
      fondo: rehabilitacion.escenario.fondo.nombreArchivo, 
      sueloPlano: rehabilitacion.escenario.sueloPlano.nombreArchivo, 
      sueloColision: rehabilitacion.escenario.sueloColision.nombreArchivo,
      rehabilitacionId: rehabilitacion.id, personajeId: personajeId,
      idResultadoActividad: idResultadoActividad, idResultadoRecorrido: datos.idResultadoRecorrido
    }});
});
}



  const redireccionar=()=>{

    let lista=rehabilitacion.actividades2.filter(x=>(x.resultadosActividades.filter(y=>y.completo).length===0))
    lista.sort((a, b) => a.orden - b.orden);
    if(lista.length>0)
    //Seleccion de la acticidad a realizar
    //En este caso vamos a respetar el orden, en un futuro podria ser aleatoria: actividad:lista[Math.round(Math.random()*lista.length)]
    setActividadActual(lista[0]);
    IniciarActividad();
  }

  const contarPendientes=(actividades)=> {

      if (actividades !== undefined) {
          let pendientes = actividades.map(function (v, k) {
              let hayResultados = v.resultadosActividades.length > 0;
              if (hayResultados) {
                  let pendientes2 = v.resultadosActividades.map(function (v, k) {
                      return v.completado
                  });
                  return !pendientes2.includes(true);
              } else
                  return true;
          });
          let filtrado = pendientes.filter(x => x);
          return filtrado.length;
      } else return 0;
  }
  const [cantidadP, setCantidadP] = useState(contarPendientes(rehabilitacion.actividades2));

    const A2 = (rehabilitacion) => {


    const {nombre,descripcion}=rehabilitacion.escenario;
    const cantidad=rehabilitacion.actividades2.length;
    

    return (
        <div className="card" onClick={redireccionar}>
          <div className="cardImage" style={{backgroundImage: 'url("/imagenes/ciudadesprevios/buenosaires2.png")'}}></div>
          <div className="cardBody"> 
            <div className="cardTextTitle">{nombre}</div>
            <div className="cardTextBody">{descripcion}</div>
            <div className="cardTextBody">Cantidad actividades: {cantidadP}/{cantidad}</div>
          </div>
          <div className="cardFootBody">
            <div className="cardFoot"> 
              { time.fechaFormato(rehabilitacion.fechaHabilitadaDesde)+' '}al{' '+time.fechaFormato(rehabilitacion.fechaHabilitadaHasta) }
            </div>
          </div>
        </div>
    );
  }

    if(rehabilitacion.escenario!==undefined)
    return A2(rehabilitacion)
    else return (<></>);
}

export default ItemRehabilitacion;