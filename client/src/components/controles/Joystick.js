import React, { useEffect, useState } from 'react';
import {Image} from 'react-bootstrap';
import { useGamepads } from 'react-gamepads';
import { useInterval } from 'usehooks-ts'

import config from '../../config/config.json';


const TipoBoton={
    Menos1:1,Mas1:2,Variable:4,Axe:8,Button:16
}

export default function Joystick({comandos},{setComandos}) {
    const [gamepads2, setGamepads2] = useState({});
    const [control, setContol]=useState({timestamp:0});

    useGamepads((gamepads) => setGamepads2(gamepads)); 

    useEffect(()=> {
        if(gamepads2[0]!=null)
            setContol(gamepads2[0]);
    },[gamepads2]);

    const [items, setItems] = useState([]);
    const agregarTecla=(tipo,id)=>{
        setItems([...items,{tipo,id}]);
    }

    const buscarTeclas= (control)=> {
        const tecla=[];
        //buscar en axes y buttons 
        for (const key in control.axes) {
            const element=control.axes[key];
            if(element!==0){
                if(element!==1||element!==-1){                    
                    //es un control x rango (0..1 o 0..-1)
                    if(element>0)
                        tecla.push({'tipo':TipoBoton.Axe+TipoBoton.Variable+TipoBoton.Mas1,'id':key});
                        //agregarTecla(TipoBoton.Axe+TipoBoton.Variable+TipoBoton.Mas1,key);
                    else
                        tecla.push({'tipo':TipoBoton.Axe+TipoBoton.Variable+TipoBoton.Menos1,'id':key});
                        //agregarTecla(TipoBoton.Axe+TipoBoton.Variable+TipoBoton.Menos1,key);
                }else{
                    //es un control 0-1 o 0--1
                    if(element>0) 
                        tecla.push({'tipo':TipoBoton.Axe+TipoBoton.Mas1,'id':key});
                        //agregarTecla(TipoBoton.Axe+TipoBoton.Mas1,key);
                    else 
                        tecla.push({'tipo':TipoBoton.Axe+TipoBoton.Menos1,'id':key});
                        //agregarTecla(TipoBoton.Axe+TipoBoton.Menos1,key);
                }
            }                        
        }
        for (const key in control.buttons){
            const button=control.buttons[key];
            if(button.pressed){
                if(button.value!==1||button.value!==-1){                    
                    //es un control x rango (0..1 o 0..-1)
                    if(button.value>0)
                        tecla.push({'tipo':TipoBoton.Button+TipoBoton.Variable+TipoBoton.Mas1,'id':key});
                        //agregarTecla(TipoBoton.Button+TipoBoton.Variable+TipoBoton.Mas1,key);
                    else
                        tecla.push({'tipo':TipoBoton.Button+TipoBoton.Variable+TipoBoton.Menos1,'id':key});
                        //agregarTecla(TipoBoton.Button+TipoBoton.Variable+TipoBoton.Menos1,key);
                }else{
                    //es un control 0-1 o 0--1
                    if(button.value>0) 
                        tecla.push({'tipo':TipoBoton.Button+TipoBoton.Mas1,'id':key});
                        //agregarTecla(TipoBoton.Button+TipoBoton.Mas1,key);
                    else 
                        tecla.push({'tipo':TipoBoton.Button+TipoBoton.Menos1,'id':key});
                        //agregarTecla(TipoBoton.Button+TipoBoton.Menos1,key);
                }
            }
        }
        return tecla;
    };

    const teclasIguales=(a,b)=>{
        return a.tipo===b.tipo&&a.id===b.id;
    }
    const estaLaCombinacionDeEn=(teclasPres,teclasConf)=>{ //console.log(teclasConf,teclasPres);
        if(teclasConf===null||teclasPres===null) return false;
        if(teclasConf.length===0||teclasPres.length===0) return false;
        if(teclasConf.length>teclasPres.length) return false;
        let iguales=true;
        teclasConf.forEach((item)=>{
            let iguales2=false;
            teclasPres.forEach((item2)=>{
                iguales2=iguales2 || (item.id===item2.id && item.tipo===item2.tipo);
            });
            iguales=iguales && iguales2;

        })

        return iguales;

    }

    const buscarTecla=(gamepad,teclas) => {
        const tecla=buscarTeclas(gamepad); 

        if(estaLaCombinacionDeEn(tecla,teclas.acelerar)) return 'acelerar';
        if(estaLaCombinacionDeEn(tecla,teclas.frenar)) return 'frenar';
        if(estaLaCombinacionDeEn(tecla,teclas.doblarDerecha)) return 'doblarDerecha';
        if(estaLaCombinacionDeEn(tecla,teclas.doblarIzquierda)) return 'doblarIzquierda';
        if(estaLaCombinacionDeEn(tecla,teclas.frenoMano)) return 'frenoMano';
        if(estaLaCombinacionDeEn(tecla,teclas.mantenerVelocidad)) return 'mantenerVelocidad';
        if(estaLaCombinacionDeEn(tecla,teclas.cambioDireccion)) return 'cambioDireccion';
        return 'nada';
    }

    const buscarCombinacionTeclas=(gamepad,teclas) => {
        const tecla=buscarTeclas(gamepad); 

        let lista=[];
        if(estaLaCombinacionDeEn(tecla,teclas.acelerar)) lista.push({accion:'acelerar-valor',valor:0.1});
        if(estaLaCombinacionDeEn(tecla,teclas.frenar)) lista.push({accion:'frenar-valor',valor:-0.1});
        if(estaLaCombinacionDeEn(tecla,teclas.doblarDerecha)) lista.push({accion:'volante-valor',valor:0.1});
        if(estaLaCombinacionDeEn(tecla,teclas.doblarIzquierda)) lista.push({accion:'volante-valor',valor:-0.1});
        if(estaLaCombinacionDeEn(tecla,teclas.frenoMano)) lista.push('frenoMano');
        if(estaLaCombinacionDeEn(tecla,teclas.mantenerVelocidad)) lista.push('mantenerVelocidad');
        if(estaLaCombinacionDeEn(tecla,teclas.cambioDireccion)) lista.push('cambioDireccion');

        if(lista.length===0)
            lista.push('nada');
        return lista;
    }

    useEffect(()=> {

        //Cada vez que iniciamos definimos los comandos iniciales si timestamp=0
        if(control.timestamp!==0)
           // console.log("iniciando predefinido");
        //else 
            switch(comandos.comandos.operacion){
                case 'setearAcelerador':
                case 'setearFreno':
                case 'setearDerecha':
                case 'setearIzquierda':
                case 'setearCambioDireccion':
                    const a=buscarTeclas(control);
                    comandos.setComandos({tipo:'seteo', operacion: comandos.comandos.operacion, teclas: a});
                    //comandos.setComandos({tipo: 'sinOperacion'});                    
                    break;
                default:
                    break;

            }            
    },[control.timestamp]);




  useInterval(
    () => {
      // Your custom logic here
      const teclas=buscarCombinacionTeclas(control,comandos.comandos.teclas);
      teclas.forEach((accion)=>{
        if(accion.accion!=='nada')
            comandos.setComandos({tipo:'enviarComando', valor:{tipo:accion.accion, valor:accion.valor}})
      });

      comandos.setComandos({tipo:'enviarComando',valor: {tipo:'iterar-Evento',valor:300}});
           
    },
    // Delay in milliseconds or null to stop it
    comandos.comandos.operacion==='lectura'?100:null
  )


/*     useEffect(()=>{
        switch(comandos.comandos.operacion) {
            case 'setearAcelerador':
                console.log('seteando acelerar');
//                comandos.setComandos({tipo: 'sinOperacion'});
                break;
            case 'setearFreno':
                console.log('seteando freno');
//                comandos.setComandos({tipo: 'sinOperacion'});
                break;
            case 'setearDerecha':
                console.log('seteando derecha');
//                comandos.setComandos({tipo: 'sinOperacion'});
                break;
            case 'setearIzquierda':
                console.log('seteando Izquierda');
//               comandos.setComandos({tipo: 'sinOperacion'});
                break;
    
            default:
                break;
        }
    },[comandos.comandos.operacion]) */

    const mostrarCondifuracion=()=>{
        console.log(comandos);
    }

    return <Image src={config.ICONOS+'joystick.png '}  height='40vw' onClick={mostrarCondifuracion}/>

}