
import Joystick from "../controles/Joystick";

const Controles= {
    TECLADO:  {nombre: 'teclado', elemento:<></>},
    VOLANTE:  {nombre: "volante", elemento:<></>},
    JOYSTICK: {nombre: "joystick", elemento: <Joystick estadoInicial={{timestamp:0}}/>},
    CELULAR:  {nombre: "celular", elemento:<></>},
    NINGUNO:  {nombre:'ninguno', elemento:<></>}
}; 

export default Controles;