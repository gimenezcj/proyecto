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
          case 'setearAcelerador':console.log('setearacelerar1')
            return {...comando,operacion: 'setearAcelerador'};
          case 'setearFreno':
              return {...comando,operacion: 'setearFreno'};     
          case 'setearDerecha':
            return {...comando,operacion: 'setearDerecha'}; 
          case 'setearIzquierda':
            return {...comando,operacion: 'setearIzquierda'};     
          case 'setearDireccionAdelante':
            return {...comando,operacion: 'setearDireccionAdelante'};    
          case 'setearDireccionAtras':
            return {...comando,operacion: 'setearDireccionAtras'};    
          case 'setearCambioDireccion':
            return {...comando,operacion: 'setearCambioDireccion'};                       
          case 'setearMoverVolante':
            return {...comando,operacion: 'setearMoverVolante'};                       
          case 'seteo':
            switch(accion.operacion) {
              case 'setearAcelerador': console.log('setearacelerar2')
                return {...comando,operacion:null,teclas: {...comando.teclas,acelerar: accion.teclas}}
              case 'setearFreno':
                return {...comando,operacion:null,teclas: {...comando.teclas,frenar:accion.teclas}}
              case 'setearDerecha':
                return {...comando,operacion:null,teclas: {...comando.teclas,doblarDerecha:accion.teclas, moverVolante:null}}
              case 'setearIzquierda':
                return {...comando,operacion:null,teclas: {...comando.teclas,doblarIzquierda:accion.teclas, moverVolante:null}}
              case 'setearCambioDireccion':
                return {...comando,operacion:null,teclas: {...comando.teclas,cambioDireccion:accion.teclas}}
              case 'setearDireccionAdelante':
                  return {...comando,operacion:null,teclas: {...comando.teclas,direccionAdelante:accion.teclas}}
              case 'setearDireccionAtras':
                    return {...comando,operacion:null,teclas: {...comando.teclas,direccionAtras:accion.teclas}}
              case 'setearMoverVolante':
                return {...comando,operacion:null,teclas: {...comando.teclas,moverVolante:accion.teclas,doblarDerecha:null,doblarIzquierda:null}}
              case 'setearBlanquearMoverVolante':
                return {...comando,operacion:null,teclas: {...comando.teclas,moverVolante:null}}
              case 'setearBlanquearDerecha':
                return {...comando,operacion:null,teclas: {...comando.teclas,doblarDerecha:null}}
              case 'setearBlanquearIzquierda':
                return {...comando,operacion:null,teclas: {...comando.teclas,doblarIzquierda:null}}
              default:
                return comando
            }
          case 'sinOperacion' :
            return {...comando,operacion:null};
/*            case 'vehiculo-teclas':
            console.log('setenado teclas')
            setVehiculo({tipo:'vehiculo-teclas',valor: comando.teclas});
            return {...comando};
 */       case 'lectura': 
              console.log('setenado teclas');  
              setVehiculo({tipo:'vehiculo-teclas',valor: comando.teclas});
              return {...comando,operacion:"lectura"};
          case 'enviarComando':   //tiende a ser eliminado
          case 'listaMoviemientos':
            setVehiculo(accion.valor);
            return {...comando,vehiculo: {vehiculo:vehiculo, setVehiculo:setVehiculo},operacion:'lectura'};
          default: 
            return comando;
        }
      }
      const [comandos,setComandos]=useReducer(nuevoComando,comandosIniciales);

      return {comandos,setComandos};
}