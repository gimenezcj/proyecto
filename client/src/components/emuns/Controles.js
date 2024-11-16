
import Joystick from "../controles/Joystick2";
import Teclado from "../controles/Teclado";
import Volante from "../controles/Volante";


const Controles= {
    TECLADO:  {nombre: 'teclado', elemento:(comandos, setComandos)=>{return <Teclado comandos={comandos} setComandos={setComandos}/>}, 'valorInicial':null},
    VOLANTE:  {nombre: "volante", elemento:(comandos, setComandos)=>{return <Volante comandos={comandos} setComandos={setComandos}/>}, 'valorInicial':null},
    JOYSTICK: {nombre: "joystick", elemento: (comandos, setComandos)=> {return <Joystick comandos={comandos} setComandos={setComandos}/>}, 'valorInicial':null},
    CELULAR:  {nombre: "celular", elemento:()=>{return <></>}, 'valorInicial':null},
    NINGUNO:  {nombre:'ninguno', elemento:()=>{return <></>}, 'valorInicial':null}
}; 

export default Controles;