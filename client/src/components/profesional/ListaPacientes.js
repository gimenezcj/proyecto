import React, { useEffect, useState } from "react";
import {Row, Col, Button, Image, Container} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';

import { useNavigate } from "react-router-dom";
import config from '../../config/config.json';

import { FaSearch } from 'react-icons/fa';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';

import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';
import es from 'date-fns/locale/es';


const Swal = require('sweetalert2');


//import 'bootstrap/dist/css/bootstrap.min.css';

export default function ListaPacientes ({persona})  {

  const navigate = useNavigate();

  const { SearchBar, ClearSearchButton } = Search;
  const [lista,setLista] = useState([]);
  const [buscar,setBuscar] = useState('');

  useEffect(()=>{
    setLista(persona.fonoaudiologo.pacientes.map((paciente) => { 
      return {
        id:paciente.id,
        dni: paciente.persona.dni,
        nombreCompleto: paciente.persona.apellido +', '+ paciente.persona.nombre,
        nroAfiliado: paciente.nroAfiliado,
        obraSocial: paciente.obraSocial.nombre
      }
    }
    ));
  },[]);

  const encabezadoBusqueda=(order, column)=>{
    if (!order) return (<span></span>);
    else if (order === 'asc') return (<span>&nbsp;&nbsp;<BsArrowDown/></span>);
    else if (order === 'desc') return (<span>&nbsp;&nbsp;<BsArrowUp/></span>);
    return null;
  }

  function btnEliminar(id){

    const eliminarBase= async(id) => { 
      fetch( config.SERVER_API_URL+'pacientes/' + id,{
        method: 'DELETE',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id})   
      }).then(res=>{return res.json().then(aux=>{
        return (aux.operation==='deleted')})})
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: 'El paciente sera eliminado del sistema junto con sus datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarBase(id).then(res=>setLista(lista.filter(p=>p.id!==id)));
      }
    })
  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (<>
      <Button className="botonIcono" onClick={()=> navigate('/paciente/informacion/' + row.id,{state:{'id':row.id}})}>
        <Image src={config.ICONOS+'informacion.png'} className='iconos'/></Button>
      <Button className="botonIcono" onClick={()=> navigate('/paciente/rehabilitaciones/' + row.id,{state:{'id':row.id}})}>
        <Image src={config.ICONOS+'rehabilitaciones.png'} className='iconos' /></Button>
      <Button className="botonIcono"><Image src={config.ICONOS+'estadisticas.png'} className='iconos' /></Button>
      <Button className="botonIcono" variant="danger" onClick={()=>btnEliminar(row.id)}><Image src={config.ICONOS+'papelera.png'} className='iconos'/></Button>
    </>);
  };

  const columnas=[
    { dataField: 'dni', text: 'DNI', sort: true, sortCaret: encabezadoBusqueda },
    { dataField: 'nombreCompleto', text: 'Apellido y Nombre', sort: true, sortCaret: encabezadoBusqueda},
    { dataField: 'nroAfiliado', text: 'N°Afiliado', sort: true, sortCaret: encabezadoBusqueda },
    { dataField: 'obraSocial', text: 'Obra Social', sort: true, sortCaret: encabezadoBusqueda },
    {
      dataField: "id",
      text: "Acciones",
      formatter:linkFollow
    }
  ];

  const defaultSorted = [{dataField: 'nombreCompleto',order: 'asc'}];

  return (
    <>  
          <Container style={{
              fontSize: '1vw', maxWidth:'95%'
          }}>
      <ToolkitProvider  locale={es} style={{marginLeft:'12vw'}} id='table'
        keyField="id"
        data={lista}
        columns={columnas}
        search
        filter={buscar}
        
      > 
        {
    props => (
      <div>
        <div style={{display:'flex', padding:'1vw 1vw 1vw 1vw'}} >
          <div style={{fontSize: '12px'}} ><FaSearch/> </div>
          <div style={{marginLeft: '1vw'}}><SearchBar { ...props.searchProps }  placeholder={'Escriba el dato a buscar'} delay={ 1000 } srText={''}/></div>
          <div><ClearSearchButton { ...props.searchProps } 
                btnText='MyClear'
                btnContextual='btn-warning'
          /></div>
        </div>
       
        <hr />
        <BootstrapTable
          { ...props.baseProps }
          pagination={paginationFactory()}
          striped  
          hover
          noDataIndication="Sin Datos" 
          defaultSorted={defaultSorted}
          
        />
 
      </div>
    )
  }
     </ToolkitProvider>
     </Container>
    </>
  );
}