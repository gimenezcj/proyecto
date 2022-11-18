import React, { Component, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BoxGeometry, Mesh, MeshBasicMaterial, ObjectLoader } from "three";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader"
//import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

import { FirstPersonControls } from "../../modules/FirstPersonControls";
import Pista from "../../modules/Pista";

export default function Escenario3(){


  const ventana=useRef(null);

  var scene, camera, renderer,controls;

  const [anguloGiro,setAnguloGiro]= useState(0);
  const [velocidad,setVelocidad]= useState(0);
  const [xActual,setXActual]=useState(0);

  var pista;

  var  yActual=0;

  useEffect(()=>{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth*1, window.innerHeight*1 );
    const sceneColor = 0x6ad6f0;
    renderer.setClearColor(sceneColor);

    if(ventana.current.div)
      console.log(ventana.current.div);
//    if(ventana.current.chidren.length===0)
      ventana.current.appendChild(renderer.domElement); 
//   Component.mount.appendChild( renderer.domElement );
    const ambientLight = new THREE.AmbientLight(0x101010);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const geometry2 = new THREE.PlaneGeometry (200,200);
    const material2 = new THREE.MeshBasicMaterial( { color: 0xaddaaa } );

    const suelo = new THREE.Mesh( geometry2, material2 );
    suelo.position.set(0, 0, 0);
    suelo.rotation.x= -3.1416/360*180; //ponemos el piso derecho!!!! => -3.1416/360*180 //- Math.PI / 2
    scene.add(suelo);
    camera.position.set( 0, 1 ,10 );
    camera.lookAt( 0, 1, 10 );

    controls = new FirstPersonControls( camera,renderer.domElement );
    controls.activeLook = false; //desactivamos el mouse


    
    const animate = () => {
      requestAnimationFrame( animate );
      setAnguloGiro(controls.anguloGiro);
      setVelocidad(controls.movementSpeed);
      controls.update();
      renderer.render( scene, camera );
    };
    
    const loader = new ObjectLoader();

    loader.load(
      // resource URL
      "modelos/estacionServicio3.json",
    
      // onLoad callback
      // Here the loaded data is assumed to be an object
      function ( obj ) {
        // Add the loaded object to the scene
        scene.add( obj );
      },
    
      // onProgress callback
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      },
    
      // onError callback
      function ( err ) {
        console.error( 'An error happened' );
      }
    );


//    pista=new Pista(animate,scene);
//    pista.objeto('modelos/sueloPlaza4.json',90);
//    pista.objeto('modelos/nomenclador.json',150);
//    pista.objeto('modelos/fabrica.json',140);
//    pista.objeto('modelos/calle1.json',20);
//    pista.objeto('modelos/banco2.json',100);
//    pista.objeto('modelos/edificio1.json',111);
//    pista.objeto('modelos/edificio1.json',111);
//    pista.objeto('modelos/male02.obj',20);
//    pista.objeto('modelos/local1.json',112);
//    pista.objeto('modelos/local2.json',113);
//    pista.objeto('modelos/local3.json',114);
//    pista.objeto('modelos/semaforo.json',80);
//    pista.objeto('modelos/senalNoAvanzar.json',33);
//    pista.objeto('modelos/senalMaxima80.json',40);
//    pista.objeto('modelos/arbol1.json',77);
//    pista.objeto('modelos/arbol2.json',240);
//    pista.objeto('modelos/arbol3.json',120);
//    pista.objeto('modelos/arbol4.json',130);
//    pista.objeto('modelos/senal2.json',22);
//    pista.objeto('modelos/senalGiroDerecha.json',23);
//    pista.objeto('modelos/senalGiroIzquierda.json',24);
//    pista.objeto('modelos/senalAvanzar.json',25);
//    pista.objeto('modelos/senalCombustible.json',26);

//    pista.objeto('modelos/estacionServicio3.json',115);

//pista.objeto('modelos/edificio1.json',90);

//pista.cargarPista('imagenes/suelo/suelo1.png');

//camera.position.x=17.8;
//camera.position.z=10;


    animate();

  },[])

  return (
    <>
    <div style={{position: 'absolute', top: '0',  left: '10px',  right: '0',  margin: '0 auto'}}>
      <div>velocidad: <span id='velocidad'>{velocidad}</span></div>
      <div>giro: <span id="anguloGiro">{anguloGiro}</span></div>
      <div>x actual: <span id="xActual">{xActual}</span></div>
      <div>y actual: <span id="yActual">{yActual}</span></div>
  </div>
  <div ref={ventana} />
  </>
  )
}
//  <div ref={ventana} />
//  <div ref={ref => (Component.mount = ref)} />


class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxGeometry(1.0, 1.0, 1.0),
      new MeshBasicMaterial({
        color: 0xee6622,
//        map: new TextureLoader().load(require("./icon.jpg")),
      })
    );
  }
}
