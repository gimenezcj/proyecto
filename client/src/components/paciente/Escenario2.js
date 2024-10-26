/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Vector2, Vector3 } from "three";
import { TextureLoader } from "three";

import { FirstPersonControls } from "../../modules/FirstPersonControls";
import Pista from "../../modules/Pista";
import Controles from "../emuns/Controles";

export default function Escenario2(props){

  const {estado,setEstado, rehabilitacion,vehiculo,control}= props;
  var {xActual,yActual,vectorDestino,reset,anguloInicial,xAnterior,yAnterior}=estado;

  const [unaCamara, setUnaCamara]= useState(null);
  const [unControl, setUnControl]= useState(null);
  const [,setAnimacionId]= useState(null);
  const aux=useRef(estado.reset);
  const [cargarModelos, setCargarModelos]=useState(false);
  const [modeloCargado,setModeloCargado]=useState(false);
  const [pista,setPista]=useState(false);

  const velocidad=useRef(0);
  const volante=useRef(0);
  const direccion=useRef(1);
  const controlu=useRef(control);


  const ventana=useRef(null);

  var xAnterior2=xActual,yAnterior2=yActual;
  var scene;
  var camera;
  var renderer,controls;
  var v2;
  //var pista;

  useEffect(()=>{
  //console.log({direccion:vehiculo.direccion, velocidadActual: vehiculo.velocidadActual, acelerador: vehiculo.acelerador, freno: vehiculo.freno});
   // console.log({volante:vehiculo.volante});
    velocidad.current=vehiculo.acelerador;
    volante.current=vehiculo.volante*-80;
    direccion.current=vehiculo.direccion;
    //v2=vehiculo;
  },[vehiculo])

  useEffect(()=>{
  if (pista)
    if(pista.hayColision(Math.floor(xActual/3)+1,Math.floor(yActual/3)+1)===0){
          unControl.movementSpeed=0;
          setEstado({tipo:'choco'});
    }
},[xActual,yActual])
  
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
    v2=vehiculo;
    setUnControl(controls);
  }

  useEffect(()=>{
    if (cargarModelos && pista){
      pista.objeto('modelos/almacen.json',200,setModeloCargado,false);
      pista.objeto('modelos/ferreteria.json',201,setModeloCargado,false);
      pista.objeto('modelos/floreria.json',202,setModeloCargado,false);

      pista.objeto('modelos/sueloPlaza4.json',90,setModeloCargado,false);
      pista.objeto('modelos/nomenclador.json',150,setModeloCargado,false);
      pista.objeto('modelos/fabrica.json',140,setModeloCargado,false);
      pista.objeto('modelos/calle1.json',20,setModeloCargado,false);
      pista.objeto('modelos/banco2.json',100,setModeloCargado,false);
      pista.objeto('modelos/edificio1.json',111,setModeloCargado,false);
      pista.objeto('modelos/edificio2.json',110,setModeloCargado,false);
      pista.objeto('modelos/local1.json',112,setModeloCargado,false);
      pista.objeto('modelos/local2.json',113,setModeloCargado,false);
      pista.objeto('modelos/local3.json',114,setModeloCargado,false);
      pista.objeto('modelos/semaforo.json',80,setModeloCargado,false);
      pista.objeto('modelos/senalNoAvanzar.json',33,setModeloCargado,false);
      pista.objeto('modelos/senalMaxima80.json',40,setModeloCargado,false);
      pista.objeto('modelos/arbol1.json',77,setModeloCargado,false);
      pista.objeto('modelos/arbol2.json',240,setModeloCargado,false);
      pista.objeto('modelos/arbol3.json',120,setModeloCargado,false);
      pista.objeto('modelos/arbol4.json',130,setModeloCargado,false);
      pista.objeto('modelos/senal2.json',22,setModeloCargado,false);
      pista.objeto('modelos/senalGiroDerecha.json',23,setModeloCargado,false);
      pista.objeto('modelos/senalGiroIzquierda.json',24,setModeloCargado,false);
      pista.objeto('modelos/senalAvanzar.json',25,setModeloCargado,false);
      pista.objeto('modelos/senalCombustible.json',26,setModeloCargado,false);
      pista.objeto('modelos/estacionServicio2.json',115,setModeloCargado,true);
    }
  },[cargarModelos])

  useEffect(()=>{
    if(modeloCargado)
      pista.cargarSuelo('imagenes/suelo/'+rehabilitacion.pista,'imagenes/suelo/'+rehabilitacion.colision);
  },[modeloCargado])

  const cargarEscenario=(animate,scene)=>{
    setPista(new Pista(animate,scene));
    setCargarModelos(true);
    
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
      
      var Y_AXIS = new Vector3(0, 1, 0);
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
        anguloGiro: volante.current,// controls.anguloGiro,
        //velocidad:  controls.movementSpeed,
        velocidad: direccion.current*velocidad.current,
        xActual: xActual,
        yActual: yActual,
        ejeZ: ares,
        distancia: distancia,
      };
      //console.log(v2.acelerador);
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
      
      if(control===Controles.TECLADO) {
        volante.current=controls.anguloGiro;
        velocidad.current=controls.movementSpeed;

        controls.update(); 
      }
      if((control===Controles.JOYSTICK)||(control===Controles.VOLANTE)){
        if(volante.current!==0 && velocidad.current>0) camera.rotateOnAxis( Y_AXIS, (direccion.current*volante.current>0?0.01:-0.01)  );
        if(volante.current!==0 && velocidad.current<0) camera.rotateOnAxis( Y_AXIS, (direccion.current*volante.current>0?-0.01:0.01)  );
        if(velocidad.current>0)  camera.translateZ(-direccion.current*velocidad.current);
    }

      
        
/*       if ( this.moveUp ) this.object.translateY( this.movementSpeed );
      if ( this.moveDown ) this.object.translateY( - this.movementSpeed );
 */
      renderer.render( scene, camera );
  
      
    };
    
    cargarEscenario(animate,scene);

  },[])

  return (<><div ref={ventana} /></>)
}