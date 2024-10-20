import React, { useEffect, useState } from 'react';
import {Image} from 'react-bootstrap';
import { useGamepads } from 'react-gamepads';
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

    const buscarTeclas= ()=> {
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

    useEffect(()=> {
        console.log(comandos);
        //Cada vez que iniciamos definimos los comandos iniciales si timestamp=0
        if(control.timestamp===0)
            console.log("iniciando predefinido");
        else 
            switch(comandos.comandos.operacion){
                case 'setearAcelerador':
                case 'setearFreno':
                case 'setearDerecha':
                case 'setearIzquierda':
                    const a=buscarTeclas();
//                    console.log(a);
                    comandos.setComandos({tipo:'seteo', operacion: comandos.comandos.operacion, teclas: a});
                    //comandos.setComandos({tipo: 'sinOperacion'});                    
                    break;
                case 'lectura':
                    console.log("presiono tecla...");
                    break;
                default:
                    break;

            }            
    },[control.timestamp]);

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