import {useReducer } from "react";
import { useInterval } from 'usehooks-ts'

export default function Vehiculo(){
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
        velocidadActual:0,
        velocidadEsperada:0,
        segundoActual:0,
        totalSegundos:1,
        direccion: DIRECCION.ADELANTE
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
        return velocidadActual+ calcularAceleracionPorSegundo(velocidadActual,velocidadEsperada) * segundo
    }

    const setear=(valoresAnteriores,accion)=>{ //console.log(accion, valoresAnteriores);
        switch (accion.tipo){
            case 'acelerar-valor': 
                const nuevaDireccionAcelerado=(valoresAnteriores.velocidadActual===0?DIRECCION.ADELANTE:valoresAnteriores.direccion);

                if(nuevaDireccionAcelerado===DIRECCION.ADELANTE)
                    return {...valoresAnteriores, acelerador: acotar(valoresAnteriores.acelerador+accion.valor,EXTREMOS.acelerador), direccion: nuevaDireccionAcelerado}
                else
                    return {...valoresAnteriores, acelerador: acotar(valoresAnteriores.acelerador-accion.valor,EXTREMOS.acelerador),freno: acotar(valoresAnteriores.freno-accion.valor,EXTREMOS.freno), direccion: nuevaDireccionAcelerado}


            case 'acelerar-set':                
                return {...valoresAnteriores, acelerador: acotar(accion.valor, EXTREMOS.acelerador)}
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
                return {...valoresAnteriores, direccion: DIRECCION.cambio(valoresAnteriores.direccion)}
             case 'iterar-Evento': 
                let nuevosValores=valoresAnteriores;

                  if(Math.abs(valoresAnteriores.acelerador+valoresAnteriores.freno)!==0||valoresAnteriores.velocidadActual>0)
                    nuevosValores= ajustarVelocidadPorActo2(valoresAnteriores);
                nuevosValores= ajustarVelocidadPorOmision(nuevosValores);
                return {...nuevosValores}                

            default:
                return {...valoresAnteriores}
        }

    }

    const ajustarVelocidadPorActo2=(valoresAnteriores)=>{
        const diferencia=valoresAnteriores.acelerador+valoresAnteriores.freno;
        let velocidadEsperada=0
        if(diferencia>0)        //Estoy acelerando
            velocidadEsperada=(valoresAnteriores.direccion===DIRECCION.ADELANTE?EXTREMOS.velocidadAdelante.MAXIMO:EXTREMOS.velocidadAtras.MAXIMO) * diferencia;
        else {                    //Estoy frenando
            if(diferencia<0) {
                velocidadEsperada= acotar(valoresAnteriores.velocidadActual+ diferencia * EXTREMOS.velocidadAdelante.MAXIMO,EXTREMOS.velocidadAdelante);
//                console.log('velocidad esperada:', velocidadEsperada);
            }
            else    
                velocidadEsperada=0;
            }
        
        return {...valoresAnteriores, velocidadActual: calcularVelocidadEnElSegundo(valoresAnteriores.velocidadActual, velocidadEsperada,0.3) }

    }
    const ajustarVelocidadPorOmision=(valoresAnteriores)=>{
        //buscamos la estabilidad del sistema acelerador y volante
        let nuevoValorVolante=valoresAnteriores.volante;
        if(valoresAnteriores.volante!==0&&valoresAnteriores.velocidadActual!==0) {
            nuevoValorVolante=valoresAnteriores.volante- Math.sign(valoresAnteriores.volante)*0.05
            if(nuevoValorVolante<0.05&&nuevoValorVolante>-0.05) nuevoValorVolante=0;
        }
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