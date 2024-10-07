import {useReducer,useEffect } from "react";

export default function AccionesPermitidas(nuevaAccion) {
const accionesPermitidas={
    acelerar: null,
    frenar: null,
    frenoMano: null,
    doblarDerecha:null,
    doblarIzquierda: null,
    mantenerVelocidad: null
};

const nuevoSeteo=(acciones,accion)=>{  
    switch (accion.tipo) {
      case 'acelerar':
        return {...acciones, acelerar: accion.comando};
      default: 
        return acciones;
    }
  }
  const [teclas,setTeclas]=useReducer(nuevoSeteo,accionesPermitidas);

  useEffect(()=>{
    setTeclas(nuevaAccion);
  },[nuevaAccion]);

  return teclas;
}