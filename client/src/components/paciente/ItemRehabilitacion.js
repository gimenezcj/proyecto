import React from "react";
import {Button, Card} from 'react-bootstrap';

function ItemRehabilitacion ({rehabilitacion}) {
  const redireccionar=()=>{
    window.location.href  ='http://localhost/auto2/ejemplo2.html';
  }

  return (
    <>
      <Card style={{ width: '25rem' }}>
        <Card.Img variant="top" src={"/imagenes/ciudadesprevios/" + 'buenosaires.png' }/>
        <Card.Body>
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

export default ItemRehabilitacion;