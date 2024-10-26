import React from "react";
import {Row, Col,Image, Button} from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';

export default function Botones (props){
  const {control}= props;
const navigate = useNavigate();
  return (
    <>
      <div style={{position: 'absolute',top: '0vh', width: '10.5vw', height: '12vh', right: '0vw', transformOrigin: '1.5vw 2vh',overflow: 'hidden', 
       padding:'0.5vw'}}>
        <Button disabled>{control}</Button><Button className="botonIcono" onClick={() => navigate(-1)}><Image src={config.ICONOS+'volver.png '} width='33vw'/></Button> 
        
      </div>
    </>
  );
}