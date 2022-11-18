import React, { Component } from "react";
import * as THREE from "three";
import { BoxBufferGeometry, Mesh, MeshBasicMaterial } from "three";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

let anguloGiro=0;
let velocidad=0;
let xActual=0;
let yActual=0;

export default class Escenario extends Component {



  componentDidMount() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth*1, window.innerHeight*1 );
    const sceneColor = 0x6ad6f0;
    renderer.setClearColor(sceneColor);
    this.mount.appendChild( renderer.domElement );
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

//    camera.position.set(0, 2, 5);

    camera.position.set( 0, 1 ,10 );
    camera.lookAt( 0, 1, 10 );




    var x=0;
    for (var i = 0; i < 15000; i++) {
        const object = new IconMesh();
        const posX=Math.floor(Math.random()*200);
        const posZ=Math.floor(Math.random()*200);
    
        object.position.set(posX-100,Math.random()*3-1.5,posZ-100)
        object.material.color={r:Math.random(),g:Math.random(),b:Math.random()};
        scene.add(object);
        //tableroArray[posX][posZ]=object;
        if(Math.random()>0.05){object.visible=false;} else x++;
    
    }
    const controls = new FirstPersonControls( camera,renderer.domElement );
    controls.activeLook = false; //desactivamos el mouse
    console.log(controls);

    const animate = () => {
      requestAnimationFrame( animate );
      anguloGiro=controls.object.rotation._y;   
      xActual=controls.object.position.x;   
      

      controls.update(0.5);
      renderer.render( scene, camera );
    };
    animate();

  }


  render() {

    return (
      <>
      <div style={{position: 'absolute', top: '0',  left: '10px',  right: '0',  margin: '0 auto'}}>
  			<div>velocidad: <span id='velocidad'>{velocidad}</span></div>
  			<div>giro: <span id="anguloGiro">{anguloGiro}</span></div>
  			<div>x actual: <span id="xActual">{xActual}</span></div>
  			<div>y actual: <span id="yActual">{yActual}</span></div>
		</div>
    <div ref={ref => (this.mount = ref)} />
    </>
    )
  }

}

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshBasicMaterial({
        color: 0xee6622,
//        map: new TextureLoader().load(require("./icon.jpg")),
      })
    );
  }
}
