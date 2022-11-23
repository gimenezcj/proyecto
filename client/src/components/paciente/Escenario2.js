/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Vector2 } from "three";
import { TextureLoader } from "three";

import { FirstPersonControls } from "../../modules/FirstPersonControls";
import Pista from "../../modules/Pista";

export default function Escenario2(props){

  const {estado,setEstado, rehabilitacion}= props;
  var {xActual,yActual,vectorDestino,reset,anguloInicial,xAnterior,yAnterior}=estado;

  const [unaCamara, setUnaCamara]= useState(null);
  const [unControl, setUnControl]= useState(null);
  const [,setAnimacionId]= useState(null);
  const aux=useRef(estado.reset);

  const ventana=useRef(null);

  var xAnterior2=xActual,yAnterior2=yActual;
  var scene;
  var camera;
  var renderer,controls;
  var pista;
  
  const iniciarVehiculo=()=>{
    camera.position.y=2;    
    camera.position.x=xActual;
    camera.position.z=yActual;
    camera.rotateY(anguloInicial/180*Math.PI);
  }

  const iniciarAmbiente=()=> {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth*1, window.innerHeight*1 );
    setUnaCamara(camera);
  }

  const iniciarEscenario=()=>{
    const sceneColor = 0x6ad6f0;
    renderer.setClearColor(sceneColor);
    ventana.current.appendChild(renderer.domElement); 
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);
    var light = new THREE.DirectionalLight( 0x888888, 0.3 );
    light.position.set( 200, 450, 3800 );
    scene.add(light);
  }

  const iniciarFondo=()=>{
//    scene.background = new CubeTextureLoader().load(rehabilitacion.fondo);  //version anterior
    const loader2 = new TextureLoader();
    loader2.load(rehabilitacion.fondo,
      (t) => {
        t.encoding = THREE.sRGBEncoding;
        t.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = t;
      });

  }

  const iniciarSuelo=()=>{
    var gm = new THREE.MeshBasicMaterial( {color: 0x9d452d} );
    var gg = new THREE.PlaneGeometry( 16000, 16000 );
    var ground = new THREE.Mesh( gg, gm );
    ground.position.y=-0.01;
    ground.rotation.x = - Math.PI / 2;
    scene.add( ground );
  }
  
  const iniciarControles=()=>{
    controls = new FirstPersonControls( camera,renderer.domElement );
    controls.activeLook = false; //desactivamos el mouse
    setUnControl(controls);
  }

  const cargarEscenario=(animate,scene)=>{
    pista=new Pista(animate,scene);
    pista.objeto('modelos/sueloPlaza4.json',90);
    pista.objeto('modelos/nomenclador.json',150);
    pista.objeto('modelos/fabrica.json',140);
    pista.objeto('modelos/calle1.json',20);
    pista.objeto('modelos/banco2.json',100);
    pista.objeto('modelos/edificio1.json',111);
    pista.objeto('modelos/edificio2.json',110);
    pista.objeto('modelos/local1.json',112);
    pista.objeto('modelos/local2.json',113);
    pista.objeto('modelos/local3.json',114);
    pista.objeto('modelos/semaforo.json',80);
    pista.objeto('modelos/senalNoAvanzar.json',33);
    pista.objeto('modelos/senalMaxima80.json',40);
    pista.objeto('modelos/arbol1.json',77);
    pista.objeto('modelos/arbol2.json',240);
    pista.objeto('modelos/arbol3.json',120);
    pista.objeto('modelos/arbol4.json',130);
    pista.objeto('modelos/senal2.json',22);
    pista.objeto('modelos/senalGiroDerecha.json',23);
    pista.objeto('modelos/senalGiroIzquierda.json',24);
    pista.objeto('modelos/senalAvanzar.json',25);
    pista.objeto('modelos/senalCombustible.json',26);
    pista.objeto('modelos/estacionServicio2.json',115);
    pista.objeto('modelos/almacen.json',200);
    pista.objeto('modelos/ferreteria.json',201);
    pista.objeto('modelos/floreria.json',202);
    pista.cargarSuelo('imagenes/suelo/'+rehabilitacion.pista,'imagenes/suelo/'+rehabilitacion.colision);
  }

    useEffect(()=>{
    if(reset){
      aux.current=true;
      setEstado({tipo:'reset', valor:false});
      unaCamara.quaternion.setFromRotationMatrix(new THREE.Matrix4( -1,  0,  0,  0, 0, -1,  0,  0, 0,  0,  1,  0, 0,  0,  0,  1 ));
      unaCamara.position.x=xActual;
      unaCamara.position.z=yActual;
      unaCamara.rotateY(anguloInicial/180*Math.PI);
      unControl.movementSpeed=0;
      unControl.anguloGiro=0;
  }
  },[reset])

  useEffect(()=>{
    iniciarAmbiente();
    iniciarEscenario();
    iniciarFondo();
    iniciarSuelo();
    iniciarControles();
    iniciarVehiculo();
    const animate = () => {
      setAnimacionId(requestAnimationFrame( animate ));

      const vd=new Vector2(vectorDestino.x,vectorDestino.y);
      const vp=new Vector2(camera.position.x,camera.position.z);
      const vres=new Vector2(0,0);
      vres.add(vd);
      vres.add(vp.negate());
      const ares=vres.angle()+(camera.rotation._z===0?camera.rotation._y:-Math.PI-camera.rotation._y)+-Math.PI*3/2;
    
      const xActual= Math.floor(camera.position.x);
      const yActual= Math.floor(camera.position.z);
    
      var distancia=0;

      if(!aux.current) {
        if(xAnterior2!==xActual || xAnterior2!==yActual) {
          distancia=Math.abs(xAnterior2-xActual)+Math.abs(yAnterior2-yActual)
          xAnterior2=xActual;yAnterior2=yActual;
        }
      }
      else {
        xAnterior2=xAnterior;
        yAnterior2=yAnterior;
        aux.current=false;
      }
    
      const nuevosValores={
        anguloGiro: controls.anguloGiro,
        velocidad:  controls.movementSpeed,
        xActual: xActual,
        yActual: yActual,
        ejeZ: ares,
        distancia: distancia,
      };
      setEstado({tipo: 'combo', valor:nuevosValores});
    
      scene.children.forEach((item, i) => {
        if (item.name!==''){
          var px=(item.position.x-camera.position.x);
          var py=-item.position.z+camera.position.z;
            item.visible=((px>-80 && px<150) && (py<80 && py>-120));
            if (item.name==="modelos/semaforo.json" ){
              item.children[2].visible=((px>-100 && px<30) && (py<100 && py>-37)); //luz
              item.children[1].visible=((px>-60 && px<-10) && (py<60 && py>-3)); //sonbrero
            }
            if ((item.name==="modelos/senalGiroIzquierda.json" )||(item.name==="modelos/senalGiroDerecha.json" )||(item.name==="modelos/senalAvanzar.json" )){
              item.rotateY(0.05);
            }
      }})
    
        if(pista.hayColision(Math.floor(xActual/3)+1,Math.floor(yActual/3)+1)===0 ){
          controls.movementSpeed=0;
          setEstado({tipo:'choco'});
        }
    
      controls.update();
      renderer.render( scene, camera );
  
      
    };
    
    cargarEscenario(animate,scene);
  },[])

  return (<><div ref={ventana} /></>)
}