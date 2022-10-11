import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import useToken from './components/useToken';

import Inicio from "./pages/Inicio";
import Ejemplo02 from "./pages/Ejemplo02";

import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {
  // eslint-disable-next-line
  const { token, setToken } = useToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Inicio setToken={setToken}  token={token}/>} />
        <Route path='/home' element={<Ejemplo02/>} />
        <Route render={() => <h1>Not found!</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;