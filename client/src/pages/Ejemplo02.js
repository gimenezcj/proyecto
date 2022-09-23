import React, { Component } from "react";
import * as THREE from "three";
export default class Ejemplo02 extends Component {
  componentDidMount() {
     var scene = new THREE.Scene();
     var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
     var renderer = new THREE.WebGLRenderer();
     renderer.setSize( window.innerWidth*0.95, window.innerHeight*0.95 );

     const sceneColor = 0x6ad6f0;
     renderer.setClearColor(sceneColor);


     // document.body.appendChild( renderer.domElement );
     // use ref as a mount point of the Three.js scene instead of the document.body
     this.mount.appendChild( renderer.domElement );
     var geometry = new THREE.BoxGeometry( 1, 1, 1 );
     var material = new THREE.MeshBasicMaterial( { color: 0xaaaaaa } );
     var cube = new THREE.Mesh( geometry, material );
     cube.material.color={r:Math.random(),g:Math.random(),b:Math.random()};
     scene.add( cube );
     camera.position.set(0, 2, 5);

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

     var animate = function () {
       requestAnimationFrame( animate );
       cube.rotation.x += 0.01;
       cube.rotation.y += 0.01;
       renderer.render( scene, camera );
     };
     animate();
   }
   render() {
     return (
       <div ref={ref => (this.mount = ref)} />
     )
   }
 }
