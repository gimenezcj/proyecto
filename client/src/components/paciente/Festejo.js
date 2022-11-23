/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//const Swal = require('sweetalert2');

export default function Festejo (props) {
  const {ovacion,todomal,estado,setEstado}=props;
  const {completado, seleccionErronea}=estado.seleccion;

  const navigate= useNavigate();

  const audioOvacion=new Audio('/modelos/menorPrecio/'+ovacion);
  const audioError=new Audio('/modelos/menorPrecio/'+todomal);

//  const ventanaFestejo=()=>{
//    Swal.fire({
//      title: 'Felicitaciones!',
//      text: 'Has completado la actividad propuesta',
//      icon: 'success',
//      showCancelButton: false,
//      confirmButtonColor: '#3f7f91',
//      confirmButtonText: 'CONTINUEMOS!!!'
//    }).then((result) => {
//      if (result.isConfirmed) {
//        navigate("/", { replace: true });
//      }
//    });
//
//  }

  const grabar=()=>{
    
  }

  useEffect(()=>{
    if(completado) {
      grabar();
      audioOvacion.play()
//      ventanaFestejo();
    }
    if(seleccionErronea&&!completado) {
      setEstado({tipo: 'seleccionErronea', valor: false});
      audioError.play();
    }      
  },[completado, seleccionErronea])

  return(
    <>
    </>
  )
}