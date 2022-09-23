import React from 'react';
import {
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  MeshBasicMaterial,
  BoxBufferGeometry,
} from "three";
//import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import { FirstPersonControls } from "../modules/FirstPersonControls";
import {PerspectiveCamera,} from "three";

export class Auto  {

  state={
    velocidad: 0,
    giro:0,
    camara: false,
    objetoSobreTerreno:false,
    controles:false,
    line:false,
    posicion:false,
  }

  constructor (){
    this.state.objetoSobreTerreno=new THREE.Group();
    const points = [];
      points.push( new THREE.Vector3( - 10, 0, 1 ) );
      points.push( new THREE.Vector3( 0, 10, 1 ) );
      points.push( new THREE.Vector3( 10, 0, 1 ) );

      const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
      const geometry = new THREE.BufferGeometry().setFromPoints( points );
      this.state.line = new THREE.Line( geometry, material );
      this.state.objetoSobreTerreno.add( this.state.line);
      this.state.objetoSobreTerreno.rotation.x= -1.5708;
      this.state.objetoSobreTerreno.rotation.z= -1.5708*2;

  }
  iniciar(width,height,domElement){
    this.state.camara = new PerspectiveCamera(50, width / height, 1, 1000);
    this.state.camara.position.set(0, 2, 5);

    this.state.controles = new FirstPersonControls( this.state.camara,domElement );

  }
  agregarAEscena(e){
    e.add(this.state.objetoSobreTerreno);
  }
  camara(){return this.state.camara;}
  update(){
//    if(this.parametros.velocidad!=0)
//      TweenMax.to(this.parametros.camara.position, 0.2, {z: this.parametros.camara.position.z - 0.1,});
  }
  aumentaVelocidad(){this.parametros.velocidad++;}
  disminuirVelocidad(){this.parametros.velocidad--;}
  actualizar(){
    this.state.controles.update(0.5);
//    this.state.camara.rotation.z++;
  }
}
