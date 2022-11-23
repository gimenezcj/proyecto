/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-concat */
import React, { useEffect, useReducer } from "react";
import {Container} from 'react-bootstrap';
import { useNavigate,useLocation} from "react-router-dom";

import Ayuda from "../../components/paciente/Ayuda";
import Festejo from "../../components/paciente/Festejo";
import ListaItemsMenorPrecio from "../../components/paciente/ListaItemsMenorPrecio";
import MenuMenorPrecio from "../../components/paciente/MenuMenorPrecio";
import config from '../../config/config.json';

const Swal = require('sweetalert2');

export default function MenorPrecio (props) {

  const navigate= useNavigate();
  const location=useLocation();
  const {actividad, rehabilitacionId, personajeId}=location.state;
  const {estimuloVisual,permanenciaVisual,sonido,comprarProducto, puntosAOtorgar}= actividad.actividadDisponible;

  const lista=comprarProducto.productos.map((v,k)=>{
    return {
      id: k+1, imagen: v.imagen.nombreArchivo, precio: v.precio, orden: k+1, seleccionado: false, 
      ayudaSonora: v.sonido.nombreArchivo, hayAyudaSonora: v.hayAyudaSonora, tiempo: permanenciaVisual}
  });

  const estadoInicial={
    activarAyuda: {sonora:false,visual:true,turno:0, ayudaEnCurso: true},
    ayuda: {
      visual: {texto: estimuloVisual, activar: true, tiempo: permanenciaVisual},
      sonora: {archivo: sonido.nombreArchivo, activar: true},
    },
    cantidadItems: lista.length,
    items: lista,
    compara: {
      minimo: null, maximo: null
    },
    seleccion: {
      seleccionErronea: false,
      ayudasVisuales:0,
      ayudasSonoras: 0,
      selecciones: [],
      inicio: new Date(),
      fin: null,
      completado: false,
      abandonado: false
    }
  }

  const idDelMinimo=(items)=>{
    return [].concat(items).sort((a,b)=>{return a.precio-b.precio})[0].id;
  }
  const idDelMaximo=(items)=>{
    return [].concat(items).sort((a,b)=>{return b.precio-a.precio})[0].id;
  }


  const nuevoEstado=(estado,accion)=>{  
    switch (accion.tipo) {
      case 'ayudaVisual':
        return {...estado, 
          activarAyuda:{...estado.activarAyuda, visual:true, sonora: false,turno:0,ayudaEnCurso:true}, 
          seleccion:{...estado.seleccion, ayudasVisuales: estado.seleccion.ayudasVisuales+1}};
      case 'ayudaSonora':
        return {...estado, 
          activarAyuda:{...estado.activarAyuda,sonora:true, visual: false,turno:0,ayudaEnCurso:true},
          seleccion:{...estado.seleccion, ayudasSonoras: estado.seleccion.ayudasSonoras+1}};
      case 'siguienteTurno':
        return {...estado,activarAyuda:{...estado.activarAyuda, turno: estado.activarAyuda.turno+1,ayudaEnCurso:(estado.activarAyuda.turno<estado.cantidadItems)}}
      case 'seleccionItem': 
        estado.seleccion.selecciones.push(accion.valor);
        return estado;
      case 'completado':
        return {...estado, seleccion: {...estado.seleccion, completado: true, fin: new Date()}}
      case 'calcular':
        return {...estado, compara: {
          minimo: idDelMinimo(estado.items), 
          maximo: idDelMaximo(estado.items)}};
      case 'seleccionErronea':        
        return {...estado, seleccion: {...estado.seleccion, seleccionErronea:accion.valor}};
      case 'abandono':
        return {...estado, seleccion: {...estado.seleccion, abandonado: true, fin: new Date()}}
      default: 
        return estado;
    }
  }

  const [estado,setEstado]=useReducer(nuevoEstado,estadoInicial);

  const ventanaFestejo=()=>{
    Swal.fire({
      title: 'Felicitaciones!',
      text: 'Has completado la actividad propuesta',
      icon: 'success',
      showCancelButton: false,
      confirmButtonColor: '#3f7f91',
      confirmButtonText: 'CONTINUEMOS!!!'
    }).then((result) => {
      if (result.isConfirmed) {
//        navigate("/", { state:{accion:'volverDesafioCompleto',
//          rehabilitacionId:rehabilitacionId, actividadId: actividad.id, resultadoActividad:estado.seleccion}});
        navigate("/", {replace: true});
      }
    });
  }

  const guardar= async(salto) => {
    fetch(config.SERVER_API_URL+'resultadoComprarProducto',{
      method: 'POST',
      headers: {
       'Content-Type': 'application/json'
      },
      body: JSON.stringify({rehabilitacionId: rehabilitacionId, actividadId:actividad.id, 
        seleccion: estado.seleccion, puntosAOtorgar: puntosAOtorgar, personajeId: personajeId})
    })
    .then(d=>{
      if(salto)
        navigate("/", {replace: true});
    });
  }

  useEffect(()=> {
    estado.items.sort(() => Math.random() - 0.5);
    setEstado({tipo: 'calcular'});
  },[])

  useEffect(()=>{
    if(estado.seleccion.completado){
      guardar(false);
      ventanaFestejo();
    }      
    if(estado.seleccion.abandonado)
      guardar(true);
//      navigate("/", { state:{accion:'volverDesafioInCompleto',
//        rehabilitacionId:rehabilitacionId, actividadId: actividad.id, resultadoActividad:estado.seleccion}});
  },[estado.seleccion.completado,estado.seleccion.abandonado])

  return (
    <>
      <Container>
        <Festejo estado={estado} ovacion='ovacion.mp3' todomal='error.mp3' setEstado={setEstado}/>
        <MenuMenorPrecio estado={estado} setEstado={setEstado} ayudaEnCurso={estado.activarAyuda.ayudaEnCurso} completado={estado.seleccion.completado}
          activarVisual={estado.ayuda.visual.activar} activarSonora={estado.ayuda.sonora.activar}/>
        <Ayuda  estado={estado} setEstado={setEstado}/>
        <ListaItemsMenorPrecio  estado={estado} setEstado={setEstado}/>
      </Container>
    </>
  )
}