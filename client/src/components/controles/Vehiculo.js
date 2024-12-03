import {useReducer, useState } from "react";
import { useInterval } from 'usehooks-ts'

export default function Vehiculo(){

    const [teclas,setTeclas]=useState(1);

    const EXTREMOS= {
        acelerador: {
            MINIMO: 0,
            MAXIMO: 1
        },
        freno: {
            MINIMO:-1,
            MAXIMO:0
        },
        volante: {
            MINIMO: -80,
            MAXIMO: 80
        },
        velocidadAdelante:{
            MINIMO:0,
            MAXIMO:140
        },
        velocidadAtras:{
            MINIMO:0,
            MAXIMO:30
        },
        velocidad: {
            MINIMO: -30,
            MAXIMO: 140
        }

    }
    const DIRECCION={
        ADELANTE:1,
        ATRAS:-1,
        cambio:(valor)=>{
            return (valor===DIRECCION.ADELANTE?DIRECCION.ATRAS:DIRECCION.ADELANTE);
        }
    }
    const vehiculoInicial={
        volante:0,      //expresdado en grados: -180 a 180
        acelerador: 0,  //% del acelerador apretado 0-1
        freno: 0,       //% del freno apretado 0-1
        velocidad: 0,   //expresado en valor: 0 -> 120 si es hacia adelante y 0 -> -10 si es marcha atraz
        velocidadActual: 0,
        velocidadEsperada:0,
        segundoActual:0,
        totalSegundos:1,
        direccion: DIRECCION.ADELANTE,
        milisegundos: new Date().getMilliseconds(),
        fecha: new Date()

    }

    const acotar=(valor, extremos)=>{
        if(extremos.MINIMO>valor) return extremos.MINIMO;
        if(extremos.MAXIMO<valor) return extremos.MAXIMO;
        return valor;
    }

    const calcularSegundosTotales=(velocidadActual, velocidadEsperada)=>{
        //ABS(REDONDEAR(ABS(G29-F29)/10+SI($G29<0;$G29/5;0)))
        return Math.abs(velocidadEsperada-velocidadActual)/10; //+(velocidadEsperada<0?velocidadEsperada/5:0)))
    }
    const calcularAceleracionPorSegundo=(velocidadActual, velocidadEsperada)=>{
        //(G29-F29)/I29
        const segundos=calcularSegundosTotales(velocidadActual,velocidadEsperada);
        return (velocidadEsperada-velocidadActual)/(segundos===0?1:segundos)
    }
    const calcularVelocidadEnElSegundo=(velocidadActual,velocidadEsperada,segundo)=>{
        //=+$F29+($H29*segundo)
        //console.log("Actual:"+ velocidadActual+" - Esperada:"+velocidadEsperada);
        return velocidadActual+ calcularAceleracionPorSegundo(velocidadActual,velocidadEsperada) * segundo
    }

    const aceleradorSet=(anteriores,valor)=>{
        //console.log("Aceletando->acelerador:"+valor+" - freno:"+anteriores.freno+" - ", anteriores);
        return {...anteriores, acelerador: valor, velocidadEsperada: acotar((-Math.abs(anteriores.freno)+Math.abs(valor)),EXTREMOS.acelerador) * EXTREMOS.velocidad.MAXIMO}}

    const setear=(valoresAnteriores,accion)=>{ //console.log(accion, valoresAnteriores);
        let resultado=valoresAnteriores;
        switch (accion.tipo){
            case 'variasAcciones':
//                console.log("accion.valor: ", accion.valor) ;
                if(accion.valor!==null)
                 accion.valor.forEach(e => {
                    switch(e.accion) {
                        case 'acelerar-set': 
                            resultado=aceleradorSet(resultado,e.valor);
                            break;
                        case 'acelerar-valor': {
                            const nuevaDireccionAcelerado=(resultado.velocidadActual===0?DIRECCION.ADELANTE:resultado.direccion);
                            if(nuevaDireccionAcelerado===DIRECCION.ADELANTE)
                                resultado={...resultado, acelerador: acotar(resultado.acelerador+e.valor,EXTREMOS.acelerador), direccion: nuevaDireccionAcelerado}
                            else
                                resultado={...resultado, acelerador: acotar(resultado.acelerador-e.valor,EXTREMOS.acelerador),freno: acotar(resultado.freno-e.valor,EXTREMOS.freno), direccion: nuevaDireccionAcelerado}            
                            break;}
                        case 'acelerar-01': {
                                if(valoresAnteriores.direccion===DIRECCION.ADELANTE)
                                    resultado={...resultado, acelerador: e.valor*EXTREMOS.acelerador.MAXIMO}
                                else
                                resultado={...resultado, acelerador: Math.abs(e.valor)*EXTREMOS.acelerador.MINIMO} 
                            break;}

                        case 'frenar':
                            resultado={...resultado, acelerador: 0};
                            break;
                        case 'frenar-set': //console.log("freno:"+e.valor+" - acelerador:"+resultado.acelerador, resultado,acotar((-Math.abs(e.valor)+Math.abs(resultado.acelerador)),EXTREMOS.acelerador));
                            resultado={...resultado, freno: e.valor, velocidadEsperada: acotar((-Math.abs(e.valor)+Math.abs(resultado.acelerador)),EXTREMOS.acelerador) * EXTREMOS.velocidad.MAXIMO};
                            break;
                        case 'frenar-valor':{   console.log("afrenar",e.valor)                      
                            const nuevaDireccionFrenado=(resultado.velocidadActual===0?DIRECCION.ATRAS:resultado.direccion);
                                if(nuevaDireccionFrenado===DIRECCION.ADELANTE)
                                    resultado={...resultado,  acelerador: acotar(resultado.acelerador+e.valor,EXTREMOS.acelerador), freno: acotar(resultado.freno+e.valor,EXTREMOS.freno), direccion: nuevaDireccionFrenado}
                                else {  
                                    resultado={...resultado, acelerador: acotar(resultado.acelerador-e.valor,EXTREMOS.acelerador), direccion: nuevaDireccionFrenado}
                                }
                            break;}
                        case 'volante-valor':
                            resultado={...resultado, volante: acotar(resultado.volante+ e.valor, EXTREMOS.volante)}
                            break;
                        case 'volante-set':{
//                            console.log('seteo valor:',e.valor);
                            resultado={...resultado, volante: acotar(e.valor, EXTREMOS.volante)}                            
                            break;}
                        case 'cambiarDireccion':
                            if(valoresAnteriores.velocidadActual===0){
                                if(valoresAnteriores.direccion===DIRECCION.ADELANTE)
                                    return {...valoresAnteriores, direccion: DIRECCION.ATRAS} 
                                else
                                    return {...valoresAnteriores, direccion: DIRECCION.ADELANTE} 
                            } else return {...valoresAnteriores}                            
                        case 'direccionAdelante'://console.log('delante');
                            if(resultado.velocidadActual===0){
                                resultado={...resultado, direccion: DIRECCION.ADELANTE} 
                            } 
                            break;
                        case 'direccionAtras': //console.log('atras');
                            if(resultado.velocidadActual===0){
                                resultado={...resultado, direccion: DIRECCION.ATRAS}
                            } 
                            break;
                        default:
                            break;
                    }
                }); 
                //console.log(resultado);
                return resultado;


/*             case 'acelerar-valor': 
                const nuevaDireccionAcelerado=(valoresAnteriores.velocidadActual===0?DIRECCION.ADELANTE:valoresAnteriores.direccion);

                if(nuevaDireccionAcelerado===DIRECCION.ADELANTE)
                    return {...valoresAnteriores, acelerador: acotar(valoresAnteriores.acelerador+accion.valor,EXTREMOS.acelerador), direccion: nuevaDireccionAcelerado}
                else
                    return {...valoresAnteriores, acelerador: acotar(valoresAnteriores.acelerador-accion.valor,EXTREMOS.acelerador),freno: acotar(valoresAnteriores.freno-accion.valor,EXTREMOS.freno), direccion: nuevaDireccionAcelerado}


            case 'acelerar-set':       
                return {...valoresAnteriores, acelerador: accion.valor}
            case 'acelerar-01':
                if(valoresAnteriores.direccion===DIRECCION.ADELANTE)
                    return {...valoresAnteriores,acelerador: accion.valor*EXTREMOS.acelerador.MAXIMO}
                else
                    return {...valoresAnteriores,acelerador: Math.abs(accion.valor)*EXTREMOS.acelerador.MINIMO} 
            case 'cambiarDireccion':
                if(valoresAnteriores.velocidad===0){
                    if(valoresAnteriores.direccion===DIRECCION.ADELANTE)
                        return {...valoresAnteriores, direccion: DIRECCION.ATRAS} 
                    else
                        return {...valoresAnteriores, direccion: DIRECCION.ADELANTE} 
                } else return {...valoresAnteriores}
            case 'frenar':
                return {...valoresAnteriores, acelerador: 0}
            case 'frenar-set':
                return {...valoresAnteriores, freno: accion.valor}
            case 'frenar-valor': 
                const nuevaDireccionFrenado=(valoresAnteriores.velocidadActual===0?DIRECCION.ATRAS:valoresAnteriores.direccion);
                if(nuevaDireccionFrenado===DIRECCION.ADELANTE)
                    return {...valoresAnteriores, acelerador: acotar(valoresAnteriores.acelerador+accion.valor,EXTREMOS.acelerador), freno: acotar(valoresAnteriores.freno+accion.valor,EXTREMOS.freno), direccion: nuevaDireccionFrenado}
                else {  
                    return {...valoresAnteriores,acelerador: acotar(valoresAnteriores.acelerador-accion.valor,EXTREMOS.acelerador), direccion: nuevaDireccionFrenado}
                }
            case 'frenar-valor-opcion-atras':
                return {...valoresAnteriores}
            case 'volante-valor':
                return {...valoresAnteriores, volante: acotar(valoresAnteriores.volante+ accion.valor, EXTREMOS.volante)}
            case 'volante-set':
                return {...valoresAnteriores, volante: acotar(accion.valor, EXTREMOS.volante)}
            case 'cambioDireccion': 
                if(valoresAnteriores.velocidadActual===0)
                    return {...valoresAnteriores, direccion: DIRECCION.cambio(valoresAnteriores.direccion)}*/
             case 'iterar-Evento': 
                resultado=valoresAnteriores;
                const actual= new Date();
                if(actual-valoresAnteriores.fecha>accion.tiempo) {
                    if(Math.abs(valoresAnteriores.acelerador+valoresAnteriores.freno)!==0||valoresAnteriores.velocidadActual>0)
                        resultado= ajustarVelocidadPorActo2(valoresAnteriores);
                    resultado= ajustarVelocidadPorOmision(resultado);
                    resultado.fecha=actual; 
                }
                return {...resultado}                 
            case 'vehiculo-teclas':console.log('setenado teclas dentro del vehiculo')
                setTeclas(accion.valor);
                return {...valoresAnteriores}
            default:
                return {...valoresAnteriores}
        }

    }

    const ajustarVelocidadPorActo2=(valoresAnteriores)=>{
        const diferencia=Math.abs(valoresAnteriores.acelerador)-Math.abs(valoresAnteriores.freno);
        let velocidadEsperada=0
        if(diferencia>0)        //Estoy acelerando
            velocidadEsperada=(valoresAnteriores.direccion===DIRECCION.ADELANTE?EXTREMOS.velocidadAdelante.MAXIMO:EXTREMOS.velocidadAtras.MAXIMO) * diferencia;
        else {                    //Estoy frenando
            if(diferencia<0) {
                velocidadEsperada= acotar(valoresAnteriores.velocidadActual+ diferencia * EXTREMOS.velocidadAdelante.MAXIMO,EXTREMOS.velocidadAdelante);                
                return {...valoresAnteriores, velocidadActual: calcularVelocidadEnElSegundo(valoresAnteriores.velocidadActual, velocidadEsperada,0.1) }
            }
            else    
                velocidadEsperada=0;
            }
        
        return {...valoresAnteriores, velocidadActual: calcularVelocidadEnElSegundo(valoresAnteriores.velocidadActual, velocidadEsperada,0.2) }

    }
    const ajustarVelocidadPorOmision=(valoresAnteriores)=>{
        //buscamos la estabilidad del sistema acelerador y volante
        let nuevoValorVolante=valoresAnteriores.volante;
        if(valoresAnteriores.volante!==0&&valoresAnteriores.velocidadActual!==0) {
            //debemos verificar si el volante esta siendo usado por varible o por boton
            if(teclas.moverVolante===null) {
                nuevoValorVolante=valoresAnteriores.volante- Math.sign(valoresAnteriores.volante)*0.05
                if(nuevoValorVolante<0.05&&nuevoValorVolante>-0.05) nuevoValorVolante=0;
            }
        }
        if(teclas.acelerar!=null&&teclas.acelerar[0].tipo==='variable')
            return {...valoresAnteriores, velocidadActual: calcularVelocidadEnElSegundo(valoresAnteriores.velocidadActual, valoresAnteriores.velocidadEsperada,0.4)};
        else
        return {...valoresAnteriores, 
            acelerador: acotar(valoresAnteriores.acelerador-0.05,EXTREMOS.acelerador), 
            freno: acotar(valoresAnteriores.freno+0.05,EXTREMOS.freno),
            volante: nuevoValorVolante
        }
    }

    const [vehiculo,setVehiculo]=useReducer(setear,vehiculoInicial);

  /*   useInterval(
        () => {console.log('0ajustando')
          // Interaccion del vehiculo con el medio
          if(vehiculo.velocidad!==0&&(Math.abs(vehiculo.acelerador+vehiculo.freno)!==0)){
            setVehiculo({tipo:'ajustarVelocidadPorActo'})
          } else 
            if(vehiculo.velocidad!==0)
                setVehiculo({tipo:'ajustarVelocidadPorOmision'})
        },
        300
      ) */
      
    return {vehiculo,setVehiculo}
}