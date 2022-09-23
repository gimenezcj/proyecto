import React from 'react';
import { GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useEffect } from "react";
import { Terreno } from "./Terreno";
import {Auto} from "./Auto";
import {
  AmbientLight,
  BoxBufferGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SpotLight,

  PlaneGeometry,

  WebGLRenderer

} from "three";

export class Escena extends React.Component {

  state={
    terreno: new Terreno(),
    auto: new Auto(),
    scene:new Scene(),
    camera:false,
    renderer:false,
    timeout:false,
    gl:false,
  }

  constructor (props){
      super(props);
  }

  render(){
    const onContextCreate = async (gl) => {
      this.state.gl=gl;
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
      const sceneColor = 0x6ad6f0;

      // Create a WebGLRenderer without a DOM element
      this.state.renderer = new WebGLRenderer(gl);
      this.state.renderer.setSize(width, height);
      this.state.renderer.setClearColor(sceneColor);

      this.state.auto.iniciar(width,height,this.state.renderer.domElement );
//      this.state.camera = new PerspectiveCamera(50, width / height, 1, 1000);
//      this.state.camera.position.set(0, 2, 5);


      this.state.scene.fog = new Fog(sceneColor, 1, 10000);
      this.state.scene.add(new GridHelper(10, 10));

      const ambientLight = new AmbientLight(0x101010);
      this.state.scene.add(ambientLight);

      const pointLight = new PointLight(0xffffff, 2, 1000, 1);
      pointLight.position.set(0, 200, 200);
      this.state.scene.add(pointLight);

      const spotLight = new SpotLight(0xffffff, 0.5);
      spotLight.position.set(0, 500, 100);
      spotLight.lookAt(this.state.scene.position);
      this.state.scene.add(spotLight);

      this.state.terreno.agregarAEscena(this.state.scene);
      this.state.auto.agregarAEscena(this.state.scene);
      const renderiza2 = () => {
          this.state.timeout = requestAnimationFrame(renderiza2);
//        controls.update(0.5);

        this.actualiza();
          this.state.renderer.render(  this.state.scene,   this.state.auto.camara());
          this.state.gl.endFrameEXP();
      };
      renderiza2();
    }

    return  <GLView style={{ flex: 1 }} onContextCreate={onContextCreate}></GLView>;
  }

  actualiza(){
    this.state.terreno.actualiza();
    this.state.auto.actualizar();
  }

}
