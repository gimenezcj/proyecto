import React, { useEffect, useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import useToken from './components/useToken';

import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from "./pages/Inicio";
import Ejemplo02 from "./pages/Ejemplo02";

import PacienteRoutes from './routes/Paciente';
import ProfesionalRoutes from "./routes/Profesional";

import Tabla from './pages/Tabla';

const App = (props) => {
  const { token, setToken } = useToken();
  const [load,setLoad]=useState(false);

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
          <Route path='/home' element={<Ejemplo02/>} />         
        </>}
        <Route path='/tabla' element={<Tabla/>} />
        <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
    </>
    }
    </>
  )
}

export default App;