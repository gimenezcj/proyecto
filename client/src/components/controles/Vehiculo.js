import {useReducer } from "react";

export default function Vehiculo(){
    const EXTREMOS= {
        acelerador: {
            MINIMO: -10,
            MAXIMO: 120
        },
        volante: {
            MINIMO: -80,
            MAXIMO: 80
        }
    }
    const DIRECCION={
        ADELANTE:1,
        ATRAS:2
    }
    const vehiculoInicial={
        volante:0,      //expresdado en grados: -180 a 180
        acelerador: 0,  //% del acelerador apretado 0-1
        freno: 0,       //% del freno apretado 0-1
        velocidad: 0,   //expresado en valor: 0 -> 120 si es hacia adelante y 0 -> -10 si es marcha atraz
        velocidadActual:0,
        velocidadEsperada:0,
        segundoActual:0,
        totalSegundos:0,
        direccion: DIRECCION.ADELANTE
    }

    const acotar=(valor, extremos)=>{
        if(extremos.MINIMO>valor) return extremos.MINIMO;
        if(extremos.MAXIMO<valor) return extremos.MAXIMO;
        return valor;
    }

    const calcularSegundosTotales=(velocidadActual, velocidadEsperada)=>{
        //ABS(REDONDEAR(ABS(G29-F29)/10+SI($G29<0;$G29/5;0)))
        return Math.abs(Math.floor(Math.abs(velocidadEsperada-velocidadActual)/10+(velocidadEsperada<0?velocidadEsperada/5:0)))
    }
    const calcularAceleracionPorSegundo=(velocidadActual, velocidadEsperada)=>{
        //(G29-F29)/I29
        return (velocidadEsperada-velocidadActual)/calcularSegundosTotales(velocidadActual,velocidadEsperada)
    }
    const calcularVelocidadEnElSegundo=(velocidadActual,velocidadEsperada,segundo)=>{
        //=+$F29+($H29*segundo)
        return velocidadActual+ calcularAceleracionPorSegundo(velocidadActual,velocidadEsperada) * segundo
    }

    const setear=(valoresAnteriores,accion)=>{ //console.log(accion, valoresAnteriores);
        switch (accion.tipo){
            case 'acelerar-valor': 
                return {...valoresAnteriores, acelerador: acotar(valoresAnteriores.acelerador+accion.valor,EXTREMOS.acelerador)}
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
                } else return {valoresAnteriores}
            case 'frenar':
                return {...valoresAnteriores, acelerador: 0}
            case 'volante-valor':
                return {...valoresAnteriores, volante: acotar(valoresAnteriores.volante+ accion.valor, EXTREMOS.volante)}
            case 'volante-set':
                return {...valoresAnteriores, volante: acotar(accion.valor, EXTREMOS.volante)}
            default:
                return {valoresAnteriores}
        }

    }

    const [vehiculo,setVehiculo]=useReducer(setear,vehiculoInicial);

    return {vehiculo,setVehiculo}
}