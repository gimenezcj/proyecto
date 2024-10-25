
import Joystick from "../controles/Joystick";
import Teclado from "../controles/Teclado";
import Volante from "../controles/Volante";

const Controles= {
    TECLADO:  {nombre: 'teclado', elemento:(comandos, setComandos)=>{return <Teclado comandos={comandos} setComandos={setComandos}/>}},
    VOLANTE:  {nombre: "volante", elemento:(comandos, setComandos)=>{return <Volante comandos={comandos} setComandos={setComandos}/>}},
    JOYSTICK: {nombre: "joystick", elemento: (comandos, setComandos)=> {return <Joystick comandos={comandos} setComandos={setComandos}/>}},
    CELULAR:  {nombre: "celular", elemento:()=>{return <></>}},
    NINGUNO:  {nombre:'ninguno', elemento:()=>{return <></>}}
}; 

export default Controles;