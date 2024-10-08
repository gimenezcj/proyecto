
import Joystick from "../controles/Joystick";

const Controles= {
    TECLADO:  {nombre: 'teclado', elemento:()=>{return <></>}},
    VOLANTE:  {nombre: "volante", elemento:()=>{return <></>}},
    JOYSTICK: {nombre: "joystick", elemento: (comandos, setComandos)=> {return <Joystick comandos={comandos} setComandos={setComandos}/>}},
    CELULAR:  {nombre: "celular", elemento:()=>{return <></>}},
    NINGUNO:  {nombre:'ninguno', elemento:()=>{return <></>}}
}; 

export default Controles;