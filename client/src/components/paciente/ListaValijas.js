import React, { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap';


import Utils from "../../utils/Utils";
import ItemValija from "./ItemValija";

function ListaPersonajes ({setMiValija, miValija, puntajeAcumulado}) {
 
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoading) {
      async function fetchData() {
        try {
          const response = await fetch(Utils.getUrl()+ 'decorativos/listAny', {
            method: 'POST',
            headers: {'Content-Type': 'application/json', "access-control-allow-origin" : "*"},
            body: JSON.stringify({grupoId:11})
          });
          if (response.ok) {
            const dog = await response.json();
            setImageUrl(dog.data);
            setError(null);
            setIsLoading(false);
          } else {
            setError("Hubo un error al obtener las imagenes");setIsLoading(false);
          }
        } catch (error) {
          setError("No pudimos hacer la solicitud para obtener las imagenes");setIsLoading(false);
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


  //const [personaje, setPesonaje]=useState(miValija.imagen);
  

  //console.log(imageUrl);

  const listItems = imageUrl.map((item) =>  
    <ItemValija
      personaje={item} 
      setMiValija={setMiValija}
      miValija={miValija}
      puntajeAcumulado={puntajeAcumulado}
    />);

  return (
    <Container>
      <Col>
        <Row style={{background: '#4176FF', textAlign: 'center'}}>
          <h4>Valijas disponibles</h4>
        </Row>
        <Row style={{marginTop: '1vw', marginLeft: '1vw', justifyContent:'space-around', overflowY: 'auto', height: '78vh', minHeight: '10px' }}>
          {listItems}
        </Row>
      </Col>
    </Container>
  );
}

export default ListaPersonajes;