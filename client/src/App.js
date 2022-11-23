import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import useToken from './components/useToken';

import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from "./pages/Inicio";


import PacienteRoutes from './routes/Paciente';
import ProfesionalRoutes from "./routes/Profesional";

import Tabla from './pages/Tabla';
import Logout from "./pages/Logout";

const App = (props) => {
  const { token, setToken } = useToken();
  const [load,setLoad]=useState(false);

  document.body.style.backgroundColor= "burlywood";

  useEffect(()=>{
    setLoad(true);
  },[token])

  return (
    <>
    {(load) && <>
    <BrowserRouter>
      <PacienteRoutes token={token} setToken={setToken}/>
      <ProfesionalRoutes token={token} setToken={setToken} />
      <Routes>
        {(!token || token===null) && <>
          <Route path='/' element={<Inicio setToken={setToken}  token={token}/>} />
               
        </>}
        <Route path='/tabla' element={<Tabla/>} /> 
        <Route path='/logout' element= {<Logout/>} />
        <Route path='*' render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
    </>
    }
    </>
  )
}

export default App;