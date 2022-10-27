import React, { useState } from "react";
import {Container, Navbar, NavbarBrand, Button} from 'react-bootstrap';
import { useNavigate,Image } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import filterFactory,{textFilter} from "react-bootstrap-table2-filter"
import config from '../../config/config.json';
import Encabezado from "../../components/paciente/Encabezado";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { Link} from 'react-router-dom';
import es from 'date-fns/locale/es';
import './style.css';
import logo from './edit.png';
import camino from './camino.png';
function Principal2 ({persona, setToken}) {  

  const navigate = useNavigate();
  
 
  async function logout() {
    return fetch(config.SERVER_API_URL + 'cuentas/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    }).then(data => data.json())
   }
   
  const salir = async e => {
    const token = await logout();
    setToken(token); 
    navigate("/", { replace: true });
  }
  
  const linkFollow = (cell, row, rowIndex, formatExtraData) => {

    return (
    <Link   to={'/registrarestudios/'+{rowIndex} }
      state= {row}
    ><img src={logo} className='imagenVane' /></Link>
  
    );
  };

  const linkFollowCamino = (cell, row, rowIndex, formatExtraData) => {

    return (
    <Link   to={'/registrarestudios/'+{rowIndex} }
      state= {row}
    ><img src={camino} className='imagenVane'/></Link>
  
    );
  };
  const columns2 = [
  { dataField: 'fecha', text: 'Fecha', sort: true },
  { dataField: 'nombre_apellido', text: 'Nombre_Apellido', sort: true, filter: textFilter() },
  { dataField: 'observaciones', text: 'Observaciones', sort: true },
  { dataField: 'lugar', text: 'Lugar', sort: true },
   {
    dataField: "_id",
    text: "Editar",
    formatter:linkFollow
  },
  {
    dataField: "_id",
    text: "Recorrido",
    formatter:linkFollowCamino
  }

];

 
  const products = [ { fecha: '2022/10/10' , nombre_apellido: 'a m', observaciones: 'observaciones', lugar: 'Lugar 1', "_id": 1 },
  { fecha:'2022/10/10' , nombre_apellido: 'v g', observaciones: 'observaciones...2', lugar: 'Lugar 2', "_id": 2 },
  { fecha: '2022/10/10' , nombre_apellido: 't h', observaciones: 'observaciones.....3', lugar: 'Lugar 3', "_id": 3 } ];


  const defaultSorted = [
    {
    dataField: 'nombre_apellido',
    order: 'desc'
  }
  ];
  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Cantidad de { from } a { to } de { size } Resultados
    </span>
  );
  
  
  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: '>>',
    firstPageText: '<<',
    nextPageText: '>',
    prePageText: '<',
    showTotal: true,
    paginationTotalRenderer:customTotal,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log('page', page);
      console.log('sizePerPage', sizePerPage);
    }
  });

  return (
<>
                
        
        <div className="container">  
                        <div className="row" className="hdr">    <div className="py-3">          
          <Link to="./registrarestudios/nuevo" className="btn btn-cian text-black">Alta de paciente</Link>   
        </div>
                        <div className="col-sm-12 btn btn-info">    
                         Pacientes 
                         </div>    
                          </div>    
                        <div  style={{ marginTop: 20 }}>  
                <BootstrapTable locale={es} 
                striped  
                hover
                            keyField="_id"
                            data={products}
                            columns={columns2}
                  filter={filterFactory()}
                  noDataIndication="Sin Datos" defaultSorted={defaultSorted} pagination={pagination} 
                  
                /> 
</div>  
                      </div> 
                      <div className="fixed-bottom">  
            <Navbar color="dark" dark='true'>
                <Container>
                    <NavbarBrand><Button variant="primary" size="lg" onClick={salir}>SALIR</Button></NavbarBrand>
                </Container>
            </Navbar>
        </div>

              </>               
  );
}

export default Principal2;