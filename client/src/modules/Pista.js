import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
//import { ObjectLoader } from './three.module';

import { ObjectLoader } from "three";

export default class Pista {
  constructor (f,scene){
    this.scene=scene;
    this.despues=f;
    this.objetos=[];
    this.imagen = new Image();
    this.colision=new Image();
    this.mapa=[];
    this.canvas = document.createElement('canvas');
    this.canvas2 = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.ctxColision = this.canvas2.getContext('2d');
  }

  objeto(nombre,tipo){
    var loader;
    const extension=nombre.split(".").pop()

    this.objetos[tipo]=false;
    var objetos=this.objetos;
    if (extension==='json')
      loader = new ObjectLoader();
    else
      loader= new OBJLoader();

    loader.load(nombre,
//      function ( obj ) {objetos[tipo]={tipo:tipo,nombre: nombre,obj: obj};},
      function ( obj ) {
        // eslint-disable-next-line no-array-constructor
        objetos[tipo]=new Array(tipo,nombre,obj);
      },

      function ( xhr ) {//console.log( (nombre+':'+xhr.loaded / xhr.total * 100) + '% cargado' );
      },
      function ( err ) {console.error( 'Un error ocurrio' );}
    );
  }

  cargarSuelo(pistaArchivo,colisionArchivo){
    this.cargarColision(colisionArchivo);
    this.cargarPista(pistaArchivo);
  }

  cargarPista (nombre) {
    var ppal=this;
    async function delay(delayInms) {
      return new Promise(resolve  => {
        setTimeout(() => {resolve(2);}, delayInms);
      });
    }
    this.imagen.onload=function(){
      ppal.ctx.drawImage(this,0,0);
      async function continua() {
        while (!ppal.objetos.every(e=>e!==false)){await delay(1000);}
        ppal.procesar(ppal);
      }
      continua();}
    this.imagen.src = nombre;
  }
  cargarColision (nombre) {
    var ppal=this;
    this.colision.onload=function(){ppal.ctxColision.drawImage(this,0,0);}
    this.colision.src = nombre;
  }

  hayColision(x,y) {
    return this.ctxColision.getImageData(x, y, 1, 1).data[0];
  }

  procesar (armar) {
//    console.log(this.scene);
    var ancho = armar.imagen.width;
    var alto  = armar.imagen.height;
    var pixel;
      for (var i=0;i<=ancho-1;i++)
        for (var j=0;j<=alto-1;j++)
        {
          pixel = armar.ctx.getImageData(i, j, 1, 1).data;         
          if (pixel[0]!==255){
            armar.mapa.push({x:i,y:j,codigo:pixel[0],rotacion:pixel[1]});
          }
        }

        armar.mapa.forEach(e => {
          if(!armar.objetos[e["codigo"]]) {
            //console.log (e)
          }
          else {
          var o=(armar.objetos[e["codigo"]][2]).clone();
          o.name=armar.objetos[e["codigo"]][1];

          o.translateZ(e["y"]*3);
          o.translateX(e["x"]*3);

          if (e["rotacion"]!==0){
            o.rotateY((e["rotacion"]/255)*(2*Math.PI));
          }
            o.visible=true;
          this.scene.add(o);
        }
        });
        //console.log(armar.scene.children);
        requestAnimationFrame( armar.despues);
    }
}