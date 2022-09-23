import { GLView } from "expo-gl";
import { Renderer, TextureLoader } from "expo-three";
import { useEffect } from "react";
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

import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";


let controls;

class Auto  {
  constructor (camara){
    this.parametros={
      velocidad: 0,
      camara: camara,
    }
  }document
  update(){
  }
  aumentaVelocidad(){
    this.parametros.velocidad++;
  }
}

function Ejemplo01() {



  let timeout;

  let cambio=false;
  let distancia=0;

  let tableroArray=new Array(200);
for (var i = 0; i < 200; i++) {
  tableroArray[i]=new Array(200)
}

  const tablero={ancho:50,largo:50}

function distanciaEntreObjetos (o1: Mesh,o2: Mesh):Number{
  let dx=(o1.position.x - o2.position.x);
  let dz=(o1.position.z - o2.position.z);
  return Math.sqrt(dx*dx  + dz*dz);

}

const geometry = new PlaneGeometry (tablero.ancho,tablero.largo);
const material = new MeshStandardMaterial({color: 0x663333});

const suelo = new Mesh( geometry, material );
suelo.position.set(0, 0, 0);
suelo.rotation.x= -1.5708; //ponemos el piso derecho!!!! => -3.1416/360*180 //- Math.PI / 2


  useEffect(() => {
    // Clear the animation loop when the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
    const sceneColor = 0x6ad6f0;

    // Create a WebGLRenderer without a DOM element
    const renderer = new WebGLRenderer(gl);
    renderer.setSize(width, height);
    renderer.setClearColor(sceneColor);

    const camera = new PerspectiveCamera(50, width / height, 1, 1000);
//    camera.position.y=2;
    camera.position.set(0, 2, 5);

    const scene = new Scene();
    scene.fog = new Fog(sceneColor, 1, 10000);
    scene.add(new GridHelper(10, 10));
    scene.add( suelo );

    const ambientLight = new AmbientLight(0x101010);
    scene.add(ambientLight);

    const pointLight = new PointLight(0xffffff, 2, 1000, 1);
    pointLight.position.set(0, 200, 200);
    scene.add(pointLight);

    const spotLight = new SpotLight(0xffffff, 0.5);
    spotLight.position.set(0, 500, 100);
    spotLight.lookAt(scene.position);
    scene.add(spotLight);

    const cube = new IconMesh();
    const cube2 = new IconMesh();
//    cube2.geometry.translate( 1.5, 0.0, 0.0 );
    scene.add(cube);
    scene.add(cube2);
console.log(cube);
var x=0;
for (var i = 0; i < 15000; i++) {
    const object = new IconMesh();
    const posX=Math.floor(Math.random()*200);
    const posZ=Math.floor(Math.random()*200);

    object.position.set(posX-100,Math.random()*3-1.5,posZ-100)
    object.material.color={r:Math.random(),g:Math.random(),b:Math.random()};
    scene.add(object);
    tableroArray[posX][posZ]=object;
    if(Math.random()>0.05){object.visible=false;} else x++;

}
//console.log(distanciaEntreObjetos(cube,cube2));

  const auto= new Auto (camera);
  auto.aumentaVelocidad();

  cube2.position.set(-2, 1, -3);

let j=0;
  controls = new FirstPersonControls( camera,renderer.domElement );
console.log(controls.object.rotation);
    function update() {j+=0.005;
      cube.rotation.y += 0.015;
      cube.rotation.x += 0.025;
//console.log(distanciaEntreObjetos(cube,cube2));
      if(cambio) {
        cube2.geometry.translate( disctancia, 0.0, 0.0 );
      }

      controls.object.rotateY(j);
      cube2.rotation.y -= 0.015;
//      TweenMax.to(cube.position, 0.2, {z: cube.position.z + 0.1,}); //UNA GENIALIDAD....
    }

    // Setup an animation loop
    const render = () => {
      timeout = requestAnimationFrame(render);
      controls.update(0.5);

      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    render();
  };
  return  <GLView style={{ flex: 1 }} onContextCreate={onContextCreate}></GLView>;
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

export default Ejemplo01;
