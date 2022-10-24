import React from "react";
import {Card, Image} from 'react-bootstrap';
const Swal = require('sweetalert2');

function ItemValija ({personaje,setMiValija,miValija,puntajeAcumulado}) {

  const deshabilitado = ()=> {return miValija.id===personaje.id}
  const menorValor = () =>{return puntajeAcumulado<personaje.valor}

  const seleccionar = () => {
    if(menorValor()){
      Swal.fire(
        'Creditos suficientes?',
        'Me parece que no tiene suficientes creditos para realizar la seleccion. Te faltan '+ (personaje.valor-puntajeAcumulado)+ ' creditos',
        'error'
      )
    }
    else setMiValija(personaje);
  }

const colorFondo = () => {
  if(menorValor()) return 'gray'
  else {
    if(deshabilitado()) return '#32BA48'
    else return '#A1C7A7'
    
  }
}

return (  
    <Card className="text-center" style={{ display: 'block',width: '20vw', height: '20vw', marginBottom: '1vw', background: colorFondo(), cursor:'pointer'}} onClick={seleccionar}>
    <Card.Body>
      <Card.Img 
        variant="top"
        src={"/imagenes/avatares/valijas/" + personaje.imagenBase.nombreArchivo}
         style={{ width: '15vw', height: '12vw', objectFit: 'cover', border: '5px', objectPposition: '20% 10%'}}
      />
      <Card.Body>
        <p style={{fontSize: '2vw', whiteSpace: 'nowrap'}}><Image src={'/imagenes/base/estrella.png'} style={{width:'3vw'}}/> {personaje.valor}</p>
      </Card.Body>
    </Card.Body>
  </Card>
  );
}

export default ItemValija;