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
      <h3 style={{color:'white'}}>Somos parte de la UTN La Plata</h3>
      <p style={{color:'white'}}></p>
    </Carousel.Caption>
   </Carousel.Item>

          <Carousel.Item>
              <img
                  className="d-block w-100"
                  src="/imagenes/banner/equipoLina.jpeg"
                  alt="Equipo"
              />
              <Carousel.Caption className="carruselshadow">
                  <h3 style={{ color: 'white' }}>Somos un equipo decidido a mejorar la calidad de vida de las personas</h3>
                  <p style={{ color: 'white' }}></p>
              </Carousel.Caption>
          </Carousel.Item>


  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/imagenes/banner/fono-paciente2.jpg"
      alt="Fonoaudiologo"
    />

    <Carousel.Caption className="carruselshadow">
      <h3 style={{color:'white'}}>Brindamos apoyo con las rehabilitaciones</h3>
      <p style={{color:'white'}}></p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="/imagenes/banner/gamificacion.jpg"
      alt="Gamificacion"
    />

    <Carousel.Caption className="carruselshadow">
      <h3 style={{color:'black'}}>Llevamos la rehabilitacion a un entorno ludico y entretenido</h3>
      <p style={{color:'white'}}></p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
  )
}

export default Banner;