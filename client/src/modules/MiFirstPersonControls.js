import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
import {LinkToControls} from "LinkToControls";

export class MiFirstPersonControls  extends FirstPersonControls {
    constructor( object, domElement ){
      super (object, domElement);
      this.activeLook=false; //Desactivamos el uso del mouse
      LinkToControls();
    }
    update() {
      if(this.moveLeft || this.moveRight) {this.moveLeft=false;this.moveRight =false}
      super.update();
    }
}
