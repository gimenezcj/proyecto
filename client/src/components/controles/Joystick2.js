import React, { useEffect, useState } from 'react';
import {Image} from 'react-bootstrap';
import config from '../../config/config.json';


export default function Joystick({comandos,setComandos,esVolante}) {

    let tipoPresicion=1;
    let setter=true;
    const [keyPress, setKeyPress]=useState([]);

    class GamePadAxeStatic {
        origen=null;
        destino=null;
        constructor (v){
            this.value=this.presicion(v);
        }
        igualG(v){
            return (this.value===this.presicion(v));
        }
        isOrigen(){
            return (this.origen!==null&&this.destino!==null)||setter;
        }
        isBasic(){
            return (this.value==1||this.value==0);
        }
        inciarOrigen(){
            this.origen=null;
            this.destino=null;
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
    }

    class GamePadButtonStatic extends GamePadAxeStatic{
        constructor (button){//console.log(typeof button.value);
            super(button.value);
            //value=button.value;
            this.pressed=button.pressed;
            this.touched=button.touched;
            
        }
        igualG(b){
            return (b.pressed===this.pressed&&b.touched===this.touched&&this.value===b.value); //super.igualG(b.value));
        }
        press(){
            return this.pressed||this.touched
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
                this.axes[i]=new GamePadAxeStatic(gamepad.axes[i]) //super.presicion(gamepad.axes[i]);            
            for(let i=0;i<gamepad.buttons.length;i++)
                this.buttons[i]=new GamePadButtonStatic(gamepad.buttons[i]);            
        }
        igualAxesG(a){
            let teclas=[];

            for(let i=0;i<a.length;i++) {
                let tipo=null;                   
                const naxe=new GamePadAxeStatic(a[i]);
                if(!this.axes[i].igualG(a[i])) { 
                    if(naxe.isBasic()&&!this.axes[i].isOrigen())
                        tipo='boton';
                    else {
                        tipo='variable';
                        if(!this.axes[i].isOrigen()) {
                            const signo=Math.sign(naxe.value);
                            const origen=(naxe.value<-0.5?-1:(naxe.value>0.5?1:0));
                            const destino=(signo===-1?(origen===-1?1:-1):(signo===1?(origen===1?-1:1):0));
                            naxe.origen=origen;   
                            naxe.destino=destino;
                        }                        
                    }
                    this.axes[i]=naxe;
                    teclas.push({tipo:tipo,index:i,valor: naxe.value,origen: naxe.origen,destino:naxe.destino});                        
                }
            }
            return teclas;
        }
        igualButtonsG(b){
            let teclas=[];
            
            for(let i=0;i<b.length;i++) {//console.log(b[i],this.buttons[i]);
                const nbutton=new GamePadButtonStatic(b[i]);
                let tipo=null;
                if(!this.buttons[i].igualG(nbutton)) {
                     if(nbutton.press())
                        if(nbutton.isBasic()&&!this.buttons[i].isOrigen())
                            tipo='boton';
                        else {
                            tipo='variable';
                            if(!this.buttons[i].isOrigen()) {
                                const signo=Math.sign(nbutton.value);
                                const origen=(nbutton.value<-0.5?-1:(nbutton.value>0.5?1:0));
                                const destino=(signo===-1?(origen===-1?1:-1):(signo===1?(origen===1?-1:1):0));
                                nbutton.origen=origen;   
                                nbutton.destino=destino;
                            }                        
                        }
                        this.buttons[i]=nbutton;
                        teclas.push({tipo:tipo,index:i,valor: nbutton.value,origen: nbutton.origen,destino:nbutton.destino});                       
                }            
            }
            return teclas;
        }

        igualG(g){
            let teclas=[];           
            teclas=teclas.concat(this.igualAxesG(g.axes));
            teclas=teclas.concat(this.igualButtonsG(g.buttons));
            if(teclas.length>0&&setter)
                setter=false;

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
        let gamepads = navigator.getGamepads();
        for(let i=0;i<gamepads.length;i++)
            if(gamepads[i]!==null)
                setKeyPress(timestampGuardados[i].igualG(gamepads[i])); 
        requestID = requestAnimationFrame(playAnimation);
      }
        playAnimation();
    };
  
    const stopAnimation = () => {
        if(requestID!==null)
            cancelAnimationFrame(requestID);
        requestID=null;
    }

    const actualizarGamepadActivos= () => {
        g2=[];

        let gamepads = navigator.getGamepads();
       
        for(let i=0;i<gamepads.length;i++){
            if(gamepads[i]!==null){                
                g2[i]=gamepads[i];
                timestampGuardados[i]= new GamepadStatic(g2[i]);
            }
        }
        setGamepadsConnected(g2.length>0);
        if(requestID===null&&g2.length>0)
            startAnimation(); 
    }
    
    useEffect(()=>{
        const gamepadConnected=window.addEventListener("gamepadconnected", (event) => {  
            g2[event.gamepad.index]=event.gamepad;
            timestampGuardados[event.gamepad.index]=new GamepadStatic(event.gamepad);
            timestampGuardados[event.gamepad.index].iniciales();
            if(requestID===null)
                startAnimation();
            setGamepadsConnected(true);
        });
        
        const gamepadDiconnected=window.addEventListener("gamepaddisconnected", (event) => {
            g2.pop(g2[event.gamepad.index]);
            if(g2.length===0){
                setGamepadsConnected(false);
                stopAnimation();
            }
        });

        actualizarGamepadActivos();
        

        return () => {
            if(gamepadConnected!== undefined)
                gamepadConnected.remove();
            if(gamepadDiconnected!== undefined)
                gamepadDiconnected.remove();
            stopAnimation();
        };
    },[]);

    const estaLaCombinacionDeEn=(teclasPres,teclasConf)=>{ //devuelve nulo si no hay coincidencia, en otro caso un objeto {valor} con el valor correspondiente de ser variable o 0
        let valor=0;
        let tipo=null;
        if(teclasConf===null||teclasPres===null) return false;
        if(teclasConf.length===0||teclasPres.length===0) return false;
        if(teclasConf.length>teclasPres.length) return false;
        let iguales=true;
        teclasConf.forEach((item)=>{
            let iguales2=false;
            teclasPres.forEach((item2)=>{
                const i=(item.index===item2.index && item.tipo===item2.tipo);
                iguales2=iguales2 || i;
                if(i) {
                    tipo=item.tipo;
                    if (item.tipo==='variable')
                        valor=parseFloat(item2.valor);                                    
                }
            });
            iguales=iguales && iguales2;

        })

        return (!iguales?false:{valor:valor,tipo:tipo});
    }

    const asignarMoviemientoSegunTecla=()=>{

        const teclas=comandos.comandos.teclas;
        let lista=[];
        let respuesta=null;
        if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.acelerar))!==false) {//console.log(respuesta.tipo);
            if(esVolante&&respuesta.tipo==='variable') //Si es volante debemos cambiar el rango de  -1 a 1 => 0 a 1
                {                    
                    const nuevoValor=((1+respuesta.valor)/2).toFixed(2);
                    lista.push({accion:'acelerar-set', valor: nuevoValor}); 
                }
            else
                // TODO: debemos veridicar si es analogico o solo boton  
                lista.push({accion:'acelerar-valor',valor:0.1});
            }

            if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.frenar))!==false) {
                if(esVolante&&respuesta.tipo==='variable') //Si es volante debemos cambiar el rango de  -1 a 1 => 0 a 1
                {

                    const nuevoValor=((1+respuesta.valor)/2).toFixed(1);
                    lista.push({accion:'frenar-set', valor: -nuevoValor});
                }
                else
                    // TODO: debemos veridicar si es analogico o solo boton
                    lista.push({accion:'frenar-valor',valor:-0.1});
            }

            if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.direccionAdelante))!==false)
                lista.push({accion:'direccionAdelante'});
            if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.direccionAtras))!==false)
                lista.push({accion:'direccionAtras'});
            if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.cambioDireccion))!==false)
                lista.push({accion:'cambioDireccion'});


            if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.doblarDerecha))!==false) 
                // TODO: debemos veridicar si es analogico o solo boton
                lista.push({accion:'volante-valor',valor:0.1});
            if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.doblarIzquierda))!==false) 
                // TODO: debemos veridicar si es analogico o solo boton
                lista.push({accion:'volante-valor',valor:-0.1});

            if((respuesta=estaLaCombinacionDeEn(keyPress,teclas.moverVolante))!==false)                 
                lista.push({accion:'volante-set', valor: respuesta.valor});

        return lista;

    }

    useEffect(()=>{
        switch(comandos.comandos.operacion){
            case 'setearDireccionAdelante':
            case 'setearDireccionAtras':
            case 'setearAcelerador':
            case 'setearFreno':
            case 'setearCambioDireccion': setter=true;
                tipoPresicion=0.5; //Bajamos la presicion para poder confirgurar en caso de movimientos variables.
                if(keyPress.length!==0) 
                    comandos.setComandos({tipo:'seteo', operacion: comandos.comandos.operacion, teclas: keyPress});
                break;
            case 'setearDerecha':
            case 'setearIzquierda':  setter=true;             
                tipoPresicion=0.5; //Bajamos la presicion para poder confirgurar en caso de movimientos variables.
                if(keyPress.length!==0)
                    //verificamos que sea un boton
                    if(keyPress[0].tipo==='boton')
                        comandos.setComandos({tipo:'seteo', operacion: comandos.comandos.operacion, teclas: keyPress});
                    else
                        comandos.setComandos({tipo:'seteo', operacion: 'setearMoverVolante', teclas: keyPress});
                break;
            case 'setearMoverVolante':setter=true;
                tipoPresicion=0.5; //Bajamos la presicion para poder confirgurar en caso de movimientos variables.
                if(keyPress.length!==0)
                    //verificamos que sea un variable
                    if(keyPress[0].tipo==='variable') 
                        comandos.setComandos({tipo:'seteo', operacion: comandos.comandos.operacion, teclas: keyPress});
                    else
                        comandos.setComandos({tipo:'seteo', operacion: 'setearBlanquearMoverVolante'});
                break;

            case 'lectura':
                tipoPresicion=2;
                const listaMovimientos=asignarMoviemientoSegunTecla();
                if(listaMovimientos.length>0) 
                    comandos.setComandos({tipo:'enviarComando', valor:{tipo:'variasAcciones', valor:listaMovimientos, tiempo:100,tiempo:100}})
                else
                    comandos.setComandos({tipo:'enviarComando', valor:{tipo:'iterar-Evento', tiempo: 100}}); //Es cada cuantos milisegundos se ejecuta.
                break;
            default:
                
                break;

        }            
//        console.log(keyPress);
    },[keyPress])

    const mostrarCondifuracion=()=>console.log(comandos);

    return <Image src={config.ICONOS+(esVolante?'volante':'joystick')+'.png'} style={gamepadsConnected?{}:{filter: "invert(100%)"}} height='40vw' onClick={mostrarCondifuracion} />
}
