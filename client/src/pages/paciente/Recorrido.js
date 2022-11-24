/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useReducer, useState} from "react";
import { useNavigate,useLocation} from "react-router-dom";

import Brujula from "../../components/paciente/Brujula";
import Combustible from "../../components/paciente/Combustible";
 import DatosPantalla from "../../components/paciente/DatosPantalla";
import Escenario2 from "../../components/paciente/Escenario2";
import Tablero from "../../components/paciente/Tablero";
import Velocimetro from "../../components/paciente/Velocimetro";
import Volante from "../../components/paciente/Volante";

const Swal = require('sweetalert2');

export default function Recorrido (){
  
  const navigate= useNavigate();
  const location=useLocation();
  const {actividad,fondo,sueloPlano,sueloColision, rehabilitacionId, personajeId}=location.state;
  const {recorrido,detalle}=actividad.actividadDisponible;

  const [brujula,setBrujula]=useState(0);
  const [sinCombustible,setSinCombustible]=useState(false);
  const [choco,setChoco]=useState(false);
  const [llego, setLlego]=useState(false);
  const consumo=0.05;  //consumo de combustible expresado en litros por unidad de medida recorrida
  const verDatos=false;

  const rehabilitacion={
    fondo: 'imagenes/fondos/'+fondo, 
    pista: sueloPlano,
    colision: sueloColision,
    origen:{
      x:recorrido.xInicial,
      y:recorrido.yInicial}, 
    destino:{
      a:{
        x:recorrido.xAFinal,
        y:recorrido.yAFinal},
      b:{
        x:recorrido.xBFinal,
        y:recorrido.yBFinal}}
    }

  const puntoMedio={x:(rehabilitacion.destino.b.x+rehabilitacion.destino.a.x)/2,y:(rehabilitacion.destino.b.y+rehabilitacion.destino.a.y)/2};

  const estadoInicial={
    anguloGiro:0,
    velocidad:10,
    xActual:rehabilitacion.origen.x, 
    yActual:rehabilitacion.origen.y,
    combustible:40,
    ejeZ:0, 
    vectorDestino: puntoMedio,
    distancia:0,
    reset:false, 
    choco:false, 
    anguloInicial:recorrido.giroInicial,
    parar: false,
    xAnterior:rehabilitacion.origen.x,
    yAnterior:rehabilitacion.origen.y};
  const nuevoEstado=(estado,accion)=>{  
    switch (accion.tipo) {
      case 'parar':
        return {anguloGiro:estado.anguloGiro,velocidad:estado.velocidad,xActual:estado.xActual,yActual:estado.yActual,combustible: estado.combustible, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino, distancia: estado.distancia, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: accion.valor, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'distancia':
        return {anguloGiro:estado.anguloGiro,velocidad:estado.velocidad,xActual:estado.xActual,yActual:estado.yActual,combustible: estado.combustible, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino, distancia: accion.valor, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'anguloGiro':          
        return {anguloGiro:accion.valor,velocidad:estado.velocidad,xActual:estado.xActual,yActual:estado.yActual,combustible: estado.combustible, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino, distancia: estado.distancia, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'velocidad':
        return {anguloGiro:estado.anguloGiro,velocidad:accion.valor,xActual:estado.xActual,yActual:estado.yActual,combustible: estado.combustible, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino, distancia: estado.distancia, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'xActual':
        return {anguloGiro:estado.anguloGiro,velocidad:estado.velocidad,xActual:accion.valor,yActual:estado.yActual,combustible: estado.combustible, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino,distancia: estado.distancia, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'yActual':
        return {anguloGiro:estado.anguloGiro,velocidad:estado.velocidad,xActual:estado.xActual,yActual:accion.valor,combustible: estado.combustible, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino,distancia: estado.distancia, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'combustible':
        return {anguloGiro:estado.anguloGiro,velocidad:estado.velocidad,xActual:estado.xActual,yActual: estado.yActual,combustible: accion.valor, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino,distancia: estado.distancia, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'ejeZ':
        return {anguloGiro:estado.anguloGiro,velocidad:estado.velocidad,xActual:estado.xActual,yActual: estado.yActual,combustible: estado.combustible, ejeZ: accion.valor, vectorDestino: estado.vectorDestino,distancia: estado.distancia, reset: estado.reset, choco: estado.choco, anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      case 'combo':    
        return {
          xAnterior: estado.xAnterior, yAnterior: estado.yAnterior,
          anguloGiro:accion.valor.anguloGiro,   // nuevo valor  
          velocidad:accion.valor.velocidad,     // nuevo valor
          xActual:accion.valor.xActual,         // nuevo valor
          yActual: accion.valor.yActual,        // nuevo valor
          combustible: ((estado.combustible>0&&!estado.reset)?estado.combustible-(accion.valor.distancia*consumo):0), 
          ejeZ: accion.valor.ejeZ,              // nuevo valor
          vectorDestino: estado.vectorDestino,
          distancia: (estado.reset?0:estado.distancia+accion.valor.distancia),
          reset: estado.reset,
          choco: estado.choco,
          anguloInicial: estado.anguloInicial,
          parar: estado.parar
          
        }
      case 'reset':
        return {
          anguloGiro:estadoInicial.anguloGiro,
          xActual:estadoInicial.xActual,
          yActual: estadoInicial.yActual,
          combustible: estadoInicial.combustible, 
          ejeZ: estadoInicial.ejeZ, 
          vectorDestino: estadoInicial.vectorDestino,
          distancia: 0, velocidad:0,
          reset: accion.valor,
          choco: estadoInicial.choco,
          anguloInicial: estadoInicial.anguloInicial,
          parar: false,
          xAnterior: estadoInicial.xAnterior, yAnterior:estadoInicial.yAnterior
        }
      case 'normal':
        return estadoInicial;
      case 'choco':
        return {anguloGiro:estado.anguloGiro,velocidad:estado.velocidad,xActual:estado.xActual,yActual: estado.yActual,combustible: estado.combustible, ejeZ: estado.ejeZ, vectorDestino: estado.vectorDestino,distancia: estado.distancia, reset: estado.reset, choco: true,anguloInicial: estado.anguloInicial, parar: estado.parar, xAnterior: estado.xAnterior, yAnterior:estado.yAnterior}
      default: 
        return estado;
    }
  }

    useEffect(()=>{
      Swal.fire({
        title: 'A MANEJAR',
        text: detalle,
        icon: 'info',
        showCancelButton: false,
        confirmButtonColor: '#3f7f91',
        confirmButtonText: 'LLEGUEMOS AL LUGAR'
      }).then((result) => {
        if (result.isConfirmed) {
          setEstado({tipo:'reset', valor: true});
        }
      });

    },[])

    const [estado,setEstado]=useReducer(nuevoEstado,estadoInicial);

    useEffect(()=>{
      if(sinCombustible)
        Swal.fire({
          title: 'Opsss!',
          text: 'Te has quedado sin combustible. Vuelve a intentarlo!!!!',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3f7f91',
          confirmButtonText: 'VOLVER A INTENTARLO'
        }).then((result) => {
          if (result.isConfirmed) {
            setEstado({tipo:'reset', valor: true});
          }
        });
      if (llego)
        Swal.fire({
          title: 'GENIAL!',
          text: 'Has llegado al tu destino. Completa la tarea!!!!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3f7f91',
          confirmButtonText: 'REALIZAR LA TAREA'
        }).then((result) => {
          if (result.isConfirmed) {
            //navigate(0);
            navigate("/menorPrecio", { replace: true, state:{actividad:actividad, rehabilitacionId:rehabilitacionId, personajeId: personajeId} });
          }
        });
        if (choco){
        setEstado({tipo:'normal', valor: false});
        Swal.fire({
          title: 'Opsss!',
          text: 'Chocaste, reintenta el recorrido',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonColor: '#3f7f91',
          confirmButtonText: 'REINTENTAR RECORRIDO'
        }).then((result) => {
          if (result.isConfirmed) {
            setEstado({tipo:'reset', valor: true});           
          }
        });}

    },[sinCombustible, llego, choco]);

    useEffect(()=>{
      const {xActual,yActual, ejeZ,combustible, choco}= estado;
      setLlego((xActual>=rehabilitacion.destino.a.x && xActual<=rehabilitacion.destino.b.x) && (yActual>=rehabilitacion.destino.a.y && yActual<=rehabilitacion.destino.b.y));
      const nuevoValor=(ejeZ)*180/Math.PI;
      setBrujula(-nuevoValor);
      setSinCombustible(combustible<=0);
      setChoco(choco);
    },[estado])

    return (
    <>
      <Tablero/>
      <Volante estado={estado} />
      <Velocimetro estado={estado}/>
      <Combustible estado={estado}/>
      <Brujula brujula={brujula} />
      {verDatos && <>
        <DatosPantalla estado={estado} rehabilitacion={rehabilitacion}/> </>}
      <Escenario2 estado={estado} setEstado={setEstado} rehabilitacion={rehabilitacion}/>
    </>
  );
}