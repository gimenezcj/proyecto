import React,{ useState } from "react";
import PropTypes from 'prop-types';
import {Form,Button} from 'react-bootstrap';
import config from '../config/config.json';

async function loginUser(credentials) {

 return fetch(config.SERVER_API_URL + 'cuentas/login', {
   method: 'POST',
   headers: { 'Content-Type': 'application/json'},
   body: JSON.stringify(credentials)
 }).then(data => data.json())
}

export default function Ingreso ({ setToken,token }) {
  const [usuario, setUser] = useState();
  const [clave, setPassword] = useState();

  const handleSubmit = async e => {
   e.preventDefault();
   const token2 = await loginUser({
     usuario,
     clave
   });
   setToken(token2);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control  placeholder="usuario" onChange={e => setUser(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Clave" onChange={e => setPassword(e.target.value)}/>
      </Form.Group>

      <Button style={{position:'absolute'}} variant="primary" type="submit" className="mb-3" >
        Acceder
      </Button>
          <div style={{ textAlign: 'right' }} > <li><a href="/RecuperoClave" style={{ fontSize: '1.5vw', color: 'black'}}>  Olvide mi contraseña </a> </li>
              <li> <a href="/NuevaCuenta" style={{ fontSize: '1.5vw', color: 'black'}}>   No tenes cuenta de usuario? Solicitala </a></li>
      </div>
    </Form>
  )
}

Ingreso.propTypes = {
  setToken: PropTypes.func.isRequired
};
