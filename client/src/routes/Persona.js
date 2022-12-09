import React from "react";
import { useState,useEffect} from "react";
import { Routes, Route} from "react-router-dom";

import Principal from "../pages/persona/Principal";

import config from '../config/config.json';

function PersonaRoutes  ({persona, setToken})  {
  return (
    <Routes>
      <Route exact path='/' element={<Principal persona={persona} setToken={setToken} />} />    
    </Routes>
  );
}

export default PersonaRoutes;