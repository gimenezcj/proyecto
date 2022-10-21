import React from "react";
import {Card, Image} from 'react-bootstrap';
const Swal = require('sweetalert2');

function ItemPersonaje ({personaje,setMiPersonaje,miPersonaje,puntajeAcumulado}) {

  const deshabilitado = ()=> {return miPersonaje.id===personaje.id}
  const menorValor = () =>{return puntajeAcumulado<personaje.valor}

  const seleccionar = () => {
    if(menorValor()){
      Swal.fire(
        'Creditos suficientes?',
        'Me parece que no tiene suficientes creditos para realizar la seleccion. Te faltan '+ (personaje.valor-puntajeAcumulado)+ ' creditos',
        'error'
      )
    }
    else setMiPersonaje(personaje);
  }

const colorFondo = () => {
  if(menorValor()) return 'gray'
  else {
    if(deshabilitado()) return '#32BA48'
    else return '#A1C7A7'
    
  }
}

return (  
    <Card className="text-center" style={{width: '15vw', marginBottom: '1vw', background: colorFondo(), cursor:'pointer'}} onClick={seleccionar}>
    <Card.Body>
      <Card.Img 
        variant="top"
        src={"/imagenes/avatares/personajes/" + personaje.imagenBase.nombreArchivo}
         style={{ width: '10vw', height: '22vw', objectFit: 'cover', border: '5px', objectPposition: '20% 10%'}}
      />
      <Card.Body>
        <p style={{fontSize: '2vw', whiteSpace: 'nowrap'}}><Image src={'/imagenes/base/estrella.png'} style={{width:'3vw'}}/> {personaje.valor}</p>
      </Card.Body>
    </Card.Body>
  </Card>
  );
}

export default ItemPersonaje;


//return '#5D9466'
