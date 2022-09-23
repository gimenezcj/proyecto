import {
	MathUtils,
	Spherical,
	Vector3
} from 'three';

const _lookDirection = new Vector3();
const _spherical = new Spherical();
const _target = new Vector3();

class FirstPersonControls {

	constructor( object, domElement ) {

		if ( domElement === undefined ) {

			console.warn( 'THREE.FirstPersonControls: The second parameter "domElement" is now mandatory.' );
			domElement = document;

		}

    this.Y_AXIS = new THREE.Vector3(0, 1, 0);
		this.object = object;
		this.domElement = domElement;
    this.anguloGiro=0;
    this.stop=false;
		// API

		this.enabled = true;

		this.movementSpeed = 0.0;
		this.lookSpeed = 0.005;

		this.lookVertical = true;
		this.autoForward = false;

		this.activeLook = false;    //desactivamos el movimiento con el mouse

		this.heightSpeed = false;
		this.heightCoef = 1.0;
		this.heightMin = 0.0;
		this.heightMax = 1.0;

		this.constrainVertical = false;
		this.verticalMin = 0;
		this.verticalMax = Math.PI;

		this.mouseDragOn = false;

		// internals

		this.autoSpeedFactor = 0.0;

		this.mouseX = 0;
		this.mouseY = 0;

		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;

		this.viewHalfX = 0;
		this.viewHalfY = 0;

		// private variables

		let lat = 0;
		let lon = 0;

		//

		this.handleResize = function () {

			if ( this.domElement === document ) {

				this.viewHalfX = window.innerWidth / 2;
				this.viewHalfY = window.innerHeight / 2;

			} else {

				this.viewHalfX = this.domElement.offsetWidth / 2;
				this.viewHalfY = this.domElement.offsetHeight / 2;

			}

		};

		this.onMouseDown = function ( event ) {

			if ( this.domElement !== document ) {

				this.domElement.focus();

			}

			if ( this.activeLook ) {

				switch ( event.button ) {

					case 0: this.moveForward = true; break;
					case 2: this.moveBackward = true; break;

				}

			}

			this.mouseDragOn = true;

		};

		this.onMouseUp = function ( event ) {

			if ( this.activeLook ) {

				switch ( event.button ) {

					case 0: this.moveForward = false; break;
					case 2: this.moveBackward = false; break;

				}

			}

			this.mouseDragOn = false;

		};

		this.onMouseMove = function ( event ) {

			if ( this.domElement === document ) {

				this.mouseX = event.pageX - this.viewHalfX;
				this.mouseY = event.pageY - this.viewHalfY;

			} else {

				this.mouseX = event.pageX - this.domElement.offsetLeft - this.viewHalfX;
				this.mouseY = event.pageY - this.domElement.offsetTop - this.viewHalfY;

			}

		};

		this.onKeyDown = function ( event ) {

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW': this.moveForward = true; break;

				case 'ArrowLeft':
				case 'KeyA': this.moveLeft = true; break;

				case 'ArrowDown':
				case 'KeyS': this.moveBackward = true; break;

				case 'ArrowRight':
				case 'KeyD': this.moveRight = true; break;

				case 'KeyR': this.moveUp = true; break;
				case 'KeyF': this.moveDown = true; break;

        case 'Space': this.stop=true;break;

			}

		};

		this.onKeyUp = function ( event ) {

			switch ( event.code ) {

				case 'ArrowUp':
				case 'KeyW': this.moveForward = false; break;

				case 'ArrowLeft':
				case 'KeyA': this.moveLeft = false; break;

				case 'ArrowDown':
				case 'KeyS': this.moveBackward = false; break;

				case 'ArrowRight':
				case 'KeyD': this.moveRight = false; break;

				case 'KeyR': this.moveUp = false; break;
				case 'KeyF': this.moveDown = false; break;

        case 'Space': this.stop=false;break;

			}

		};

		this.lookAt = function ( x, y, z ) {

			if ( x.isVector3 ) {

				_target.copy( x );

			} else {

				_target.set( x, y, z );

			}

			this.object.lookAt( _target );

			setOrientation( this );

			return this;

		};

		this.update = function () {

			return function update( delta ) {

				if ( this.enabled === false ) return;

        if (this.stop) {
          this.movementSpeed=0;
          this.stop=!this.stop;
        }

        if (this.movementSpeed>0 && !this.moveForward) this.movementSpeed-=0.005;
        else if (this.moveForward) this.movementSpeed+=0.05;
        if (this.movementSpeed<0 && !this.moveBackward) this.movementSpeed+=0.005;
        else if (this.moveBackward)
          if (this.movementSpeed>=0) this.movementSpeed-=0.05;
          else if(this.movementSpeed>-0.1) this.movementSpeed-=0.01;

        if (this.movementSpeed<0) this.movementSpeed+=0.005;
        if (this.movementSpeed>0) this.movementSpeed-=0.005;

        if (this.movementSpeed<0.01 && this.movementSpeed>-0.01) this.movementSpeed=0;

        if ( this.moveLeft) this.anguloGiro++;
        if ( this.moveRight) this.anguloGiro--;

        if (this.anguloGiro<0 && this.movementSpeed!=0) this.anguloGiro+=0.5;
        if (this.anguloGiro>0 && this.movementSpeed!=0) this.anguloGiro-=0.5;
        if (this.anguloGiro<0.5 && this.anguloGiro>-0.5) this.anguloGiro=0;

				if ( this.moveUp ) this.object.translateY( this.movementSpeed );
				if ( this.moveDown ) this.object.translateY( - this.movementSpeed );

        if(this.movementSpeed!=0) this.object.translateZ( -this.movementSpeed );
        if(this.anguloGiro!=0 && this.movementSpeed>0) this.object.rotateOnAxis( this.Y_AXIS, (this.anguloGiro>0?1:-1) * 0.01 );
        if(this.anguloGiro!=0 && this.movementSpeed<0) this.object.rotateOnAxis( this.Y_AXIS, (this.anguloGiro>0?-1:1) * 0.01 );

			};

		}();

		this.dispose = function () {

			this.domElement.removeEventListener( 'contextmenu', contextmenu );
			this.domElement.removeEventListener( 'mousedown', _onMouseDown );
			this.domElement.removeEventListener( 'mousemove', _onMouseMove );
			this.domElement.removeEventListener( 'mouseup', _onMouseUp );

			window.removeEventListener( 'keydown', _onKeyDown );
			window.removeEventListener( 'keyup', _onKeyUp );

		};

		const _onMouseMove = this.onMouseMove.bind( this );
		const _onMouseDown = this.onMouseDown.bind( this );
		const _onMouseUp = this.onMouseUp.bind( this );
		const _onKeyDown = this.onKeyDown.bind( this );
		const _onKeyUp = this.onKeyUp.bind( this );

		this.domElement.addEventListener( 'contextmenu', contextmenu );
		this.domElement.addEventListener( 'mousemove', _onMouseMove );
		this.domElement.addEventListener( 'mousedown', _onMouseDown );
		this.domElement.addEventListener( 'mouseup', _onMouseUp );

		window.addEventListener( 'keydown', _onKeyDown );
		window.addEventListener( 'keyup', _onKeyUp );

		function setOrientation( controls ) {

			const quaternion = controls.object.quaternion;

			_lookDirection.set( 0, 0, - 1 ).applyQuaternion( quaternion );
			_spherical.setFromVector3( _lookDirection );

			lat = 90 - MathUtils.radToDeg( _spherical.phi );
			lon = MathUtils.radToDeg( _spherical.theta );
		}
		this.handleResize();
		setOrientation( this );
	}
}

function contextmenu( event ) {

	event.preventDefault();

}

export { FirstPersonControls };
