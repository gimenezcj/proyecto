import React, {useParams, useState} from "react";
import {Row, Col,Image, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';
import Utils from "../../utils/Utils";
import Configuracion from './../../components/paciente/Configuracion';

function Menu ({setToken, setConfiguracion, configuracion,comando}) {
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
        navigate("/");
      }

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
//console.log(comando);
    return (
        <><Configuracion activo={show} setActivo={setShow} setConfiguracion={setConfiguracion} configuracion={configuracion}></Configuracion>
        <Row>
            <Col><Button disabled>{comando}</Button></Col>
            <Col><Button className="botonIcono" onClick={handleShow}><Image src={config.ICONOS+'configurar.png '} width='33vw' height='33vw'/></Button></Col>
            <Col><Button className="botonIcono"  onClick={salir}><Image src={config.ICONOS+'salir.png '} width='33vw' height='33vw'/></Button></Col>
        </Row>
        </>
    );
}

export default Menu;