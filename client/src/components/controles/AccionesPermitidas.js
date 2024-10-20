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
//  console.log(accion);
    switch (accion.tipo) {      
      case 'setear':
        switch(accion.operacion)       {
          case 'setearAcelerador':
            return {...acciones,acelerar:accion.teclas}
          case 'setearFreno':
            return {...acciones,frenar:accion.teclas}
          case 'setearDerecha':
            return {...acciones,doblarDerecha:accion.teclas}
          case 'setearIzquierda':
            return {...acciones,doblarIzquierda:accion.teclas}                
          default:
            return acciones;
        }
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