import React from "react";
import {Carousel} from 'react-bootstrap';

function Banner (props) {
  return (
    <Carousel variant="dark">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/imagenes/banner/fotoUtn.jpeg"
      alt="UTN La Plata"
    />
    <Carousel.Caption className="carruselshadow">
      <h3 style={{color:'white'}}>Estación principal</h3>
      <p style={{color:'white'}}>UTN La Plata</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/imagenes/banner/fotoZoo.jpg"
      alt="Zoologico de La Plata"
    />

    <Carousel.Caption className="carruselshadow">
      <h3 style={{color:'white'}}>Estación</h3>
      <p style={{color:'white'}}>Zoo La Plata</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/imagenes/banner/inicial.jpg"
      alt="Proximamente"
    />

    <Carousel.Caption className="carruselshadow">
      <h3 style={{color:'white'}}> </h3>
      <p style={{color:'white'}}>Próximamente nuevas estaciones</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}

export default Banner;