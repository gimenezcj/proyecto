import React, { useEffect, useState } from 'react';
import {Image} from 'react-bootstrap';
import config from '../../config/config.json';


export default function Joystick({comandos},{setComandos}) {

    let tipoPresicion=1;
    const [keyPress, setKyPress]=useState([]);

    class GamePadButtonStatic {
        constructor (button){
            this.pressed=button.pressed;
            this.touched=button.touched;
            this.value=button.value;
        }
        igualG(b){
            return (b.pressed===this.pressed&&b.touched===this.touched&&this.value===b.value);
        }
        iniciales(){
            return (this.pressed?"presionado":"")+(" valor:"+this.value);
        }
    }

    class GamepadStatic {
        constructor (gamepad) {
            this.id=gamepad.id;
            this.index=gamepad.index;
            this.timestamp=gamepad.timestamp;
            this.axes=[];
            this.buttons=[];
            for(let i=0;i<gamepad.axes.length;i++) 
                this.axes[i]=this.presicion(gamepad.axes[i]);            
            for(let i=0;i<gamepad.buttons.length;i++)
                this.buttons[i]=new GamePadButtonStatic(gamepad.buttons[i]);            
        }
        presicion(numero){
            if(tipoPresicion===1||tipoPresicion===2)
                return numero.toFixed(tipoPresicion);
            if(numero<-0.85)
                return -1;
            if(numero<-0.62)
                return -0.75;
            if(numero<-0.4)
                return -0.5;
            if(numero<-0.2) 
                return -0.25;
            if(numero<0.2)
                return 0;
            if(numero<0.4)
                return 0.25;
            if(numero<0.62)
                return 0.5;
            if(numero<0.85)
                return 0.75;
            return 1
        }        
        igualAxesG(a){
            let teclas=[];

            for(let i=0;i<a.length;i++) {
                const pre=this.presicion(a[i]);
                const igual=this.presicion(a[i])===this.axes[i];
                if (!igual) {
                    this.axes[i]=pre;
                    teclas.push({tipo:'axe',index:i,valor: pre});
                }
            }
            return teclas;
        }
        igualButtonsG(b){
            let teclas=[];
            for(let i=0;i<b.length;i++) {
                const igual=this.buttons[i].igualG(b[i]);
                if(!igual) {
                     if(b[i].pressed)
                        teclas.push({tipo:'button',index:i, press: b[i].pressed})
                    this.buttons[i]= new GamePadButtonStatic(b);
                }
            }
            return teclas;
        }

        igualG(g){
            let teclas=[];           
            teclas=teclas.concat(this.igualAxesG(g.axes));
            teclas=teclas.concat(this.igualButtonsG(g.buttons));
            return teclas;
        }   
        iniciales(){
            for(let i=0;i<this.axes.length;i++)
                console.log("axe[",i,"]-> ",this.axes[i]);
            for(let i=0;i<this.buttons.length;i++){
                console.log("button[",i,"]->", this.buttons[i].iniciales())
            }
        }
    }

    const [gamepadsConnected, setGamepadsConnected] = useState(false);

    let g2=[];
    let timestampGuardados=[];

    let requestID=null;

    const startAnimation = () => {
       // Animation using requestAnimationFrame     
       const playAnimation=()=> {
        //Analizar si hay cambios en los gamepads
        g2.forEach(g=>{
            setKyPress(timestampGuardados[g.index].igualG(g));
/*             const teclas=timestampGuardados[g.index].igualG(g); 
            if(teclas.length>0){
                console.log(teclas);
            } 
 */        })
         

        requestID = requestAnimationFrame(playAnimation);
      }
        playAnimation();
    
    };
  
    const stopAnimation = () => {
        if(requestID!==null)
            cancelAnimationFrame(requestID);
        requestID=null;
    }
    
    useEffect(()=>{
        tipoPresicion=0.5;

        window.addEventListener("gamepadconnected", (event) => {  
            g2[event.gamepad.index]=event.gamepad;
            timestampGuardados[event.gamepad.index]=new GamepadStatic(event.gamepad);
            timestampGuardados[event.gamepad.index].iniciales();
            if(requestID===null)
                startAnimation();
            setGamepadsConnected(true);
        });
        
        window.addEventListener("gamepaddisconnected", (event) => {
            g2.pop(g2[event.gamepad.index]);
            if(g2.length===0){
                setGamepadsConnected(false);
                stopAnimation();
            }
        });

    },[]);

    useEffect(()=>{
        switch(comandos.comandos.operacion){
            case 'setearAcelerador':
            case 'setearFreno':
            case 'setearDerecha':
            case 'setearIzquierda':
            case 'setearCambioDireccion':
                if(keyPress.length!==0) {
                    console.log("seteando...", keyPress)
                    comandos.setComandos({tipo:'seteo', operacion: comandos.comandos.operacion, teclas: keyPress});
                    
                }
                //comandos.setComandos({tipo: 'sinOperacion'});                    
                break;
            default:
                break;

        }            

//        if(keyPress.length!==0) console.log("se presiono una tecla");
    },[keyPress])

    const mostrarCondifuracion=()=>{
        console.log(comandos);
    }

    return <Image src={config.ICONOS+'joystick.png '} style={gamepadsConnected?{}:{filter: "invert(100%)"}} height='40vw' onClick={mostrarCondifuracion} />
}
