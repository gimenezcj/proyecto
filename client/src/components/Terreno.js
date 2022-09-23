import React from 'react';
import {
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  MeshBasicMaterial,
  BoxBufferGeometry,
} from "three";

export class Terreno  {

  state={
    suelo:false,
    objetosEnSuelo:[],
    tablero:[],
  }
  constructor (props){

    const geometry = new PlaneGeometry (200,200);
    const material = new MeshStandardMaterial({color: 0x663333});

    this.state.suelo = new Mesh( geometry, material );
    this.state.suelo.position.set(0, 0, 0);
    this.state.suelo.rotation.x= -1.5708; //ponemos el piso derecho!!!! => -3.1416/360*180 //- Math.PI / 2
    this.iniciarTablero();
    this.cargarObjetosEnSuelo();
  }

  iniciarTablero(){
    for (var i = 0; i < 200; i++)
      this.state.tablero[i]=new Array(200)
  }

  cargarObjetosEnSuelo (){
    var x=0;
    for (var i = 0; i < 15000; i++) {
        const object = new IconMesh();
        const posX=Math.floor(Math.random()*200);
        const posZ=Math.floor(Math.random()*200);

        object.position.set(posX-100,Math.random()*3-1.5,posZ-100)
        object.material.color={r:Math.random(),g:Math.random(),b:Math.random()};
        this.state.tablero[posX][posZ]=object;
        this.state.objetosEnSuelo.push(object);
        if(Math.random()>0.05){object.visible=false;} else x++;
    }
  }

  agregarAEscena(e){
    e.add(this.state.suelo);
    this.state.objetosEnSuelo.forEach(i=>e.add(i));
  }

  actualiza(){
//    if(Math.random()<0.1){this.state.objetosEnSuelo.forEach(i=>{if(i.visible){i.rotation.y=+Math.random()*0.05}})};
  }
  render(){}
}

class IconMesh extends Mesh {
  constructor() {
    super(
      new BoxBufferGeometry(1.0, 1.0, 1.0),
      new MeshBasicMaterial({
        color: 0xee6622,
      })
    );
  }
}
