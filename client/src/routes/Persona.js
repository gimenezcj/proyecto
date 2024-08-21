import React from "react";
import { Routes, Route} from "react-router-dom";

import Principal from "../pages/persona/Principal";

function PersonaRoutes  ({persona, setToken})  {
  return (
    <Routes>
      <Route exact path='/' element={<Principal persona={persona} setToken={setToken} />} />    
    </Routes>
  );
}

export default PersonaRoutes;