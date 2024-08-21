import React from "react";
import { useEffect, useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';

import config from '../../config/config.json';
import ItemPersonaje from "./ItemPersonaje";

function ListaPersonajes ({setMiPersonaje, miPersonaje, puntajeAcumulado}) {
 
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(config.SERVER_API_URL + 'decorativos/listAny', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "access-control-allow-origin" : "*"},
            body: JSON.stringify({grupoId:10})
          });
          if (response.ok) {
            const dog = await response.json();
            setImageUrl(dog.data);
            setError(null);
            setIsLoading(false);
          } else {
            setError("Hubo un error al obtener el perrito");setIsLoading(false);
          }
        } catch (error) {
          setError("No pudimos hacer la solicitud para obtener el perrito");setIsLoading(false);
        }
      }
      fetchData();
    }
  }, [isLoading]);

  const randomDog = () => {
    setIsLoading(true);
  };

  if (error) {
    return (
      <div className="App">
        <h1>{error}</h1>
        <button onClick={randomDog}>Volver a intentarlo</button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="App">
        <h1>Cargando...</h1>
      </div>
    );
  }

  const listItems = imageUrl.map((item) =>  
    <ItemPersonaje 
      personaje={item} 
      setMiPersonaje={setMiPersonaje}
      miPersonaje={miPersonaje}
      puntajeAcumulado={puntajeAcumulado}
    />);

  return (
    <Container>
      <Col>
        <Row style={{background: '#4176FF', textAlign: 'center'}}>
          <h4>Personajes disponibles</h4>
        </Row>
        <Row style={{marginTop: '1vw', marginLeft: '1vw', justifyContent:'space-around', overflowY: 'auto', height: '78vh'}}>
          {listItems}
        </Row>
      </Col>
    </Container>
  );
}

export default ListaPersonajes;