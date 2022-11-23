import React from "react";
import {Col,Row} from 'react-bootstrap';
import ItemMenorPrecio from "./ItemMenorPrecio";

export default function ListaItemsMenorPrecio (props) {
  const {estado,setEstado}=props;

  return(
    <>
      <Row style={{marginTop: '10vh'}}>
        {estado.items.map((v,k)=>{
          return (<Col><ItemMenorPrecio datos={v} 
            activarAyuda={estado.activarAyuda} setEstado={setEstado} minimoId={estado.compara.minimo} tiempoInicial={estado.seleccion.inicio} clave={k}/></Col>)
        })}
      </Row>
    </>
  )
}