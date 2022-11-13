import React, { useEffect, useState } from "react";
import {Row, Col, Button, Image, Container} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { dateFilter } from "react-bootstrap-table2-filter";
import { useNavigate } from "react-router-dom";

import config from '../../config/config.json';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import { FaSearch } from 'react-icons/fa';

import 'bootstrap/dist/css/bootstrap.min.css';
import './table.css';
import es from 'date-fns/locale/es';

export default function ListaRehabilitaciones ({paciente,fonoaudiologoId, setElemento})  {

  const { SearchBar, ClearSearchButton } = Search;
  const [lista,setLista] = useState([]);
  const [listaCruda,setListaCruda] = useState([]);
  const [buscar,setBuscar] = useState('');
  const navigate = useNavigate();
  const Swal = require('sweetalert2');

  const cargarRehabilitaciones=async () => {
    fetch(config.SERVER_API_URL+'rehabilitaciones/paciente/'+paciente.id, {method: 'GET'})
      .then(res=>res.json()).then((data)=>setListaCruda(data.data));
  }

  useEffect(()=>{
    const aux=listaCruda.map(x=>{return {
      id: x.id,
      fechaCreacion: x.fechaCreacion,
      fechaRealizacion: x.fechaRealizacion,
      fechaHabilitadaDesde: x.fechaHabilitadaDesde,
      fechaHabilitadaHasta: x.fechaHabilitadaHasta,
      realizada: x.realizada
    }});
    setLista(aux);
  },[listaCruda]);
  useEffect(()=>{cargarRehabilitaciones()},[]);

  const encabezadoBusqueda=(order, column)=>{
    if (!order) return (<span></span>);
    else if (order === 'asc') return (<span>&nbsp;&nbsp;<BsArrowDown/></span>);
    else if (order === 'desc') return (<span>&nbsp;&nbsp;<BsArrowUp/></span>);
    return null;
  }

  function btnEliminar(id){

    const eliminarBase= async(id) => { 
      fetch( config.SERVER_API_URL+'rehabilitaciones/' + id,{
        method: 'DELETE',
        headers: {
         'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id})   
      })
        .then(res=>res.json())
        .then(aux=>console.log(aux))
    }

    Swal.fire({
      title: 'Estas seguro?',
      text: 'La rehabilitacion sera eliminada del sistema junto con sus datos y estadisticas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminala!'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarBase(id).then(res=>setLista(lista.filter(p=>p.id!==id)));
      }
    })
  }

  const linkFollow = (cell, row, rowIndex, formatExtraData) => {
    return (<>
      <Button className="botonIcono" onClick={()=> {
        setElemento(listaCruda.filter(x=>x.id===row.id)[0]);
        navigate('/rehabilitacion/informacion',{state:{pacienteId:paciente.id}})}}>
        <Image src={config.ICONOS+'informacion.png'} className='iconos'/></Button>
      <Button className="botonIcono"><Image src={config.ICONOS+'estadisticas.png'} className='iconos' /></Button>
      <Button className="botonIcono" variant="danger" onClick={()=>btnEliminar(row.id)}><Image src={config.ICONOS+'papelera.png'} className='iconos'/></Button>
    </>);
  };

  const fechaFormato = (cell, row, rowIndex, formatExtraData) => {
    if(!cell) return (<>Sin fecha</>)
    else {
      const completo=new Date(cell);
      completo.setDate(completo.getDate() +1 );
      const dia = `${(completo.getDate())}`.padStart(2,'0');
      const mes = `${(completo.getMonth()+1)}`.padStart(2,'0');
      const ano = completo.getFullYear();

      return (<>{dia}-{mes}-{ano}</>);
    }
  }
  const realizadaFormato = (cell, row, rowIndex, formatExtraData) => {
    if(cell) return (<><span style={{color: 'green'}}>Lista</span></>)
    else return (<>Pendiente</>)
  }

  const columnas=[
    { dataField: 'fechaCreacion', text: 'Creada', sort: true, sortCaret: encabezadoBusqueda, formatter: fechaFormato },    
    { dataField: 'fechaHabilitadaDesde', text: 'Desde', sort: true, sortCaret: encabezadoBusqueda, formatter: fechaFormato},
    { dataField: 'fechaHabilitadaHasta', text: 'Hasta', sort: true, sortCaret: encabezadoBusqueda, formatter: fechaFormato},
    { dataField: 'fechaRealizacion', text: 'Realizada', sort: true, sortCaret: encabezadoBusqueda, formatter: fechaFormato},
    { dataField: 'realizada', text: 'Realizada', sort: true, sortCaret: encabezadoBusqueda, formatter: realizadaFormato},
    {
      dataField: "id",
      text: "Acciones",
      formatter:linkFollow
    }
  ];
  
  const defaultSorted = [{dataField: 'fechaCreacion',order: 'asc'}];

  return (
    <>
    <Container style={{ fontSize: '1vw', maxWidth: '95%'}}>
      <Row style={{ marginTop: '2vh' }} >
        <Col ><span style={{fontSize:'2vw'}}>Paciente: </span><span style={{fontSize:'2.5vw'}}>{paciente.persona.nombre} {paciente.persona.apellido}</span></Col>
      </Row>
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
          noDataIndication="No hay rehabilitaciones para mostrar" 
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
