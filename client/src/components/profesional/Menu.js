import React, {useParams} from "react";
import {Row, Col,Image, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import './table.css';
import Utils from "../../utils/Utils";


function Menu ({setToken,titulo, iconoVentana, botones, setState}) {

  const navigate = useNavigate();

  async function logout() {
    return fetch(Utils.getUrl()+ 'cuentas/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }).then(data => data.json())
   }
   
  const salir = async e => {
    const token = await logout();
    setToken(token); 
    navigate("/", { replace: true });
  }

  const condicionRecorrido=(botones & config.BOTONES.RECORRIDO)>0;
  const condicionEstadistica=(botones & config.BOTONES.ESTADISTICA)>0;
  const condicionTarea=(botones & config.BOTONES.TAREA)>0;
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
            {(condicionRecorrido) && <>
              <Button className="botonIcono" ><Image src={config.ICONOS+'recorrido.png '} width='33vw'/></Button> </>}
            {(condicionTarea) && <>
              <Button className="botonIcono" ><Image src={config.ICONOS+'tarea.png '} width='33vw'/></Button> </>}
            {(condicionEstadistica) && <>
              <Button className="botonIcono" ><Image src={config.ICONOS+'estadisticas.png '} width='33vw'/></Button> </>}
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