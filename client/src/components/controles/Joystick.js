import React, { useEffect, useState } from 'react';
import { useGamepads } from 'react-gamepads';


export default function Joystick({comandos},{setComandos}) {
    const [gamepads2, setGamepads2] = useState({});
    const [control, setContol]=useState({timestamp:0});

    useGamepads((gamepads) => setGamepads2(gamepads)); 

    useEffect(()=> {
        if(gamepads2[0]!=null)
            setContol(gamepads2[0]);
    },[gamepads2]);

    useEffect(()=> {
        //Cada vez que iniciamos definimos los comandos iniciales si timestamp=0
        if(control.timestamp===0)
            console.log("iniciando predefinido");
        else 
            switch(comandos.comandos.operacion){
                case 'setearAcelerador':
                case 'setearFreno':
                case 'setearDerecha':
                case 'setearIzquierda':
                    console.log(control);
                    comandos.setComandos({tipo: 'sinOperacion'});
                    break;
                default:
                    break;

            }            
    },[control.timestamp]);

    useEffect(()=>{
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
    },[comandos.comandos.operacion])

    return <div>hook1</div>;
}