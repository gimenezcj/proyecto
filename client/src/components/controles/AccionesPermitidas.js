import {useReducer,useEffect } from "react";

export default function AccionesPermitidas() {
const accionesPermitidas={
    acelerar: null,
    frenar: null,
    frenoMano: null,
    doblarDerecha:null,
    doblarIzquierda: null,
    mantenerVelocidad: null,    
    operacion:null
};

const nuevoSeteo=(acciones,accion)=>{  
    switch (accion.tipo) {
      case 'setearAcelerador':
      case 'setearFreno':
        return {...acciones, operacion: accion.tipo};
      case 'sinOperacion':
        return {...acciones, operacion:null};
      default: 
        return acciones;
    }
  }
  const [teclas,setTeclas]=useReducer(nuevoSeteo,accionesPermitidas);

  return {teclas,setTeclas};
}