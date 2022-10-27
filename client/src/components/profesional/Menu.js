import React, {useParams} from "react";
import {Row, Col,Image, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import './table.css';


function Menu ({setToken,titulo, iconoVentana, botones, setState}) {

  const navigate = useNavigate();

  async function logout() {
    return fetch(config.SERVER_API_URL + 'cuentas/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }).then(data => data.json())
   }
   
  const salir = async e => {
    const token = await logout();
    setToken(token); 
    navigate("/", { replace: true });
  }

  const condicionNuevoPaciente=(botones & config.BOTONES.NUEVOPACIENTE)>0;
  const condicionNuevaRehabilitacion=(botones & config.BOTONES.NUEVAREHABILIACION)>0;
  const condicionSalir=(botones & config.BOTONES.CERRAR)>0;
  const condicionVolver=(botones & config.BOTONES.VOLVER)>0;

  return (
    <Row style={{background: '#647566', alignItems: 'center'}}>
      <Col xs={1} style={{justifyContent:'center', display: 'flex'}}>
        <Image src={config.ICONOS+iconoVentana} style={{height:'4vw',marginTop: '1vh', marginBottom:'1vh'}}/>
      </Col>
      <Col >
        <Row style={{alignContent: 'baseline', fontSize: '2.5vw'}}>
          <Col xs={8}>{titulo}</Col>
          <Col style={{display: 'flex', justifyContent: 'flex-end'}}>
            {(condicionNuevoPaciente) && <>
              <Button className="botonIcono" onClick={()=>navigate('/paciente/nuevo')}><Image src={config.ICONOS+'nuevoPaciente.png '} width='33vw'/></Button> </>}
            {(condicionNuevaRehabilitacion) && <>
              <Button className="botonIcono" onClick={()=>navigate('/rehabilitacion/nueva',setState())}><Image src={config.ICONOS+'nuevaRehabilitacion.png '} width='33vw'/></Button> </>}
            {(condicionVolver) && <>
              <Button className="botonIcono" onClick={() => navigate(-1)}><Image src={config.ICONOS+'volver.png '} width='33vw'/></Button> </> }
            {((condicionSalir)>0) && <>
              <Button className="botonIcono" onClick={salir}><Image src={config.ICONOS+'salir.png '} width='33vw'/></Button> </>}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
 
export default Menu;