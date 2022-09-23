import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";

export class MiFirstPersonControls  extends FirstPersonControls {
    constructor( object, domElement ){
      super (object, domElement);
      this.activeLook=false; //Desactivamos el uso del mouse
    }
    update() {
      if(this.moveLeft || this.moveRight) {this.moveLeft=false;this.moveRight =false}
      super.update();
    }
}
