import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import useToken from './components/useToken';

import 'bootstrap/dist/css/bootstrap.min.css';

import Inicio from "./pages/Inicio";
import Ejemplo02 from "./pages/Ejemplo02";

import PacienteRoutes from './routes/Paciente';

const App = (props) => {
  // eslint-disable-next-line
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <PacienteRoutes token={token} setToken={setToken}/>
      <Routes>
        {(!token) && <>
          <Route path='/' element={<Inicio setToken={setToken}  token={token}/>} />
          <Route path='/home' element={<Ejemplo02/>} />
          </>}
        <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;