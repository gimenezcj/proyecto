import React from "react";
import {Button, Card} from 'react-bootstrap';



import '../../pages/estilos/estilos_paciente.css';

const time = require( '../../modules/Time');

function ItemRehabilitacion ({rehabilitacion}) {
  const redireccionar=()=>{
      window.location.href ='http://www.pixpaper.com.ar/auto/ejemplo2.html';
  }

  const a1=(rehabilitacion)=>{
    return (
      <>
      <Card ><Card.Body>
        <Card.Img variant="top" src={"/imagenes/ciudadesprevios/" + 'buenosaires.png' } style={{width:'10vw'}}/>
        
          <Card.Title>Buenos Aires</Card.Title>
          <Card.Text>
            <p>Recorremos las calles de Buenos Aires y completamos el desafio.</p>
            <footer className="blockquote-footer">
            Disponible desde: <cite title="Source Title">01/11/2022</cite> hasta: <cite title="Source Title">10/11/2022</cite>
            </footer>
          </Card.Text>
          <Button onClick={redireccionar}>ACCEDER AL DESAFIO</Button>
        </Card.Body>
      </Card>    
    </>

    );
  }
console.log(rehabilitacion);
  const a2 = (rehabilitacion)=>{
    return (
      <>
        <div className="card" onClick={redireccionar}>
          <div className="cardImage" style={{backgroundImage: 'url("/imagenes/ciudadesprevios/buenosaires2.png")'}}></div>
          <div className="cardBody"> 
            <div className="cardTextTitle">Buenos Aires</div>
            <div className="cardTextBody">Recorremos las calles de Buenos Aires y completamos el desafio.</div>
          </div>
          <div className="cardFootBody">
            <div className="cardFoot"> 
              { time.fechaFormato(rehabilitacion.fechaHabilitadaDesde)+' '}al{' '+time.fechaFormato(rehabilitacion.fechaHabilitadaHasta) }
            </div>
          </div>
        </div>
      </>
    );
  }

  return a2(rehabilitacion);
}

export default ItemRehabilitacion;