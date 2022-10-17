import React from "react";
import { Routes, Route} from "react-router-dom";

//Paginas
import Principal from "../pages/paciente/Principal";

function PacienteRoutes  ({token, setToken})  {

  return (
    <Routes>
      {(token) && <>
      <Route path='/' element={<Principal persona={token.info.persona} setToken={setToken}/>}/>
      </>}
    </Routes>
  );
}

export default PacienteRoutes;

