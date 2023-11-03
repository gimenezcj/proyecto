import React, { useEffect, useState } from "react";
import {Button, Card} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";



import '../../pages/estilos/estilos_paciente.css';

const time = require( '../../modules/Time');

function ItemRehabilitacion ({rehabilitacion, personajeId}) {
  const navigate= useNavigate();

  const redireccionar=()=>{

    var lista=rehabilitacion.actividades2.filter(x=>(x.resultadosActividades.filter(y=>y.completo).length===0))
//    console.log(lista);
      lista.sort((a, b) => a.orden - b.orden);
 

//    console.log(lista);
    if(lista.length>0)
//    console.log(lista[0]);
      navigate("/recorrido", { state:{actividad:lista[Math.round(Math.random()*lista.length)],
        fondo: rehabilitacion.escenario.fondo.nombreArchivo, 
        sueloPlano: rehabilitacion.escenario.sueloPlano.nombreArchivo, 
        sueloColision: rehabilitacion.escenario.sueloColision.nombreArchivo,
        rehabilitacionId: rehabilitacion.id, personajeId: personajeId
      }});
  }

  const contarPendientes=(actividades)=> {

      if (actividades !== undefined) {
          var pendientes = actividades.map(function (v, k) {
              var hayResultados = v.resultadosActividades.length > 0;
              if (hayResultados) {
                  var pendientes2 = v.resultadosActividades.map(function (v, k) {
                      return v.completado
                  });
                  return !pendientes2.includes(true);
              } else
                  return true;
          });
          var filtrado = pendientes.filter(x => x);
          return filtrado.length;
      } else return 0;
  }
  const [cantidadP, setCantidadP] = useState(contarPendientes(rehabilitacion.actividades2));

    const A2 = (rehabilitacion) => {


    const {nombre,descripcion}=rehabilitacion.escenario;
    const cantidad=rehabilitacion.actividades2.length;
    

    return (
      <>
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
      </>
    );
  }

    if(rehabilitacion.escenario!==undefined)
    return A2(rehabilitacion)
    else return (<></>);
}

export default ItemRehabilitacion;