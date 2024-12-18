import {useReducer,useEffect } from "react";

export default function AccionesPermitidas() {
let accionesPermitidas={
    acelerar: null,
    frenar: null,
    frenoMano: null,
    moverVolante:null,
    doblarDerecha:null,
    doblarIzquierda: null,
    mantenerVelocidad: null,    
    cambioDireccion: null,
    direccionAdelante:null,
    direccionAtras:null,
    operacion:null
};

const nuevoSeteo=(acciones,accion)=>{  
 console.log(accion);
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
          case 'setearMoverVolante':
            return {...acciones,moverVolante:accion.teclas}      
          case 'setearCambioDireccion':
            return {...acciones,cambioDireccion:accion.teclas}                
          default:
            return acciones;
        }
        
      case 'setearMoverVolante':
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