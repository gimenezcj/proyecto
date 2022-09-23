import React, { Component } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Ejemplo02 from "./pages/Ejemplo02";

export default class App extends Component {
   render() {
     return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Ejemplo02/>} />
          <Route path='/home' element={<Ejemplo02/>} />
          <Route render={() => <h1>Not found!</h1>} />
        </Routes>
      </BrowserRouter>
     )
   }
 }
