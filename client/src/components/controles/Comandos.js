import React, {useReducer } from "react";
import Controles from "../../components/emuns/Controles";
import AccionesPermitidas from "../../components/controles/AccionesPermitidas";
import Vehiculo from "./Vehiculo";

export default function Comandos (){
    const {teclas, setTeclas}=AccionesPermitidas();
    const {vehiculo, setVehiculo}=Vehiculo();

    const comandosIniciales={
        control: Controles.TECLADO,
        teclas: teclas,
        operacion: null,
        vehiculo: {vehiculo:vehiculo, setVehiculo: setVehiculo}
      };
      const nuevoComando=(comando,accion)=>{ 
        switch (accion.tipo) {
          case 'setearInicial':
            console.log(accion.tipo,comando);
            return comando;
          case 'nuevoDispositivo':
            return {...comando, control: accion.dispositivo};
          case 'setearAcelerador':
            return {...comando,operacion: 'setearAcelerador'};
          case 'setearFreno':
              return {...comando,operacion: 'setearFreno'};     
          case 'setearDerecha':
            return {...comando,operacion: 'setearDerecha'}; 
          case 'setearIzquierda':
            return {...comando,operacion: 'setearIzquierda'};     
          case 'setearCambioDireccion':
            return {...comando,operacion: 'setearCambioDireccion'};                       
          case 'seteo':
            setTeclas({tipo:'setear', operacion: accion.operacion, teclas: accion.teclas});
            return {...comando,operacion:null,teclas:teclas};
          case 'sinOperacion' :
            return {...comando,operacion:null};
          case 'lectura': 
            return {...comando,operacion:"lectura"};
          case 'enviarComando':
             setVehiculo(accion.valor);
             return {...comando,vehiculo: {vehiculo:vehiculo, setVehiculo:setVehiculo},operacion:'lectura'};
          default: 
            return comando;
        }
      }
      const [comandos,setComandos]=useReducer(nuevoComando,comandosIniciales);

      return {comandos,setComandos};
}