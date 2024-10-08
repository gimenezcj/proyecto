import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import useToken from './components/useToken';

import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from "./pages/Inicio";


import PacienteRoutes from './routes/Paciente';
import ProfesionalRoutes from "./routes/Profesional";
import PersonaRoutes from "./routes/Persona";

import Tabla from './pages/Tabla';
import Logout from "./pages/Logout";

const App = (props) => {
  const { token, setToken } = useToken();
  const [load,setLoad]=useState(false);
  const [persona, setPersona] = useState(false);
  const [paciente,setPaciente]=useState(false);
  const [fono,setFono]=useState(false);

  document.body.style.backgroundColor= "burlywood";

  useEffect(()=>{
    if(token!==undefined && token!==null) {
      setLoad(true);
      setPaciente(token?token.info.persona.paciente:false);
      setFono(token?token.info.persona.fonoaudiologo:false);
      setPersona(token?token.info.persona:false);
    }
    else {
      setLoad(false);
      setPaciente(false);
      setPersona(false);
    }
  },[token]);

  return (
    <BrowserRouter>
      {(paciente) && <PacienteRoutes token={token} setToken={setToken}/>}     
      {(!paciente&&fono) && <ProfesionalRoutes token={token} setToken={setToken} />}
      {(!paciente&&!fono&&persona) && <PersonaRoutes persona={persona} setToken={setToken} />}

      <Routes>
        {(!token || token===null) && <Route path='/' element={<Inicio setToken={setToken}  token={token}/>} />}
        <Route path='/tabla' element={<Tabla/>} /> 
        <Route path='/logout' element= {<Logout/>} />
        <Route path='*' render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;