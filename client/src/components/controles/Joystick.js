import React, { useEffect, useState } from 'react';
import { useGamepads } from 'react-gamepads';


export default function Joystick(estadoInicial) {
    const [gamepads2, setGamepads2] = useState({});
    const [control, setContol]=useState(estadoInicial);

    useGamepads((gamepads) => setGamepads2(gamepads)); 

    useEffect(()=> {
        if(gamepads2[0]!=null)
            setContol(gamepads2[0]);
    },[gamepads2]);

    useEffect(()=> {
            console.log(control);
    },[control.timestamp]);

    return <div>hook1</div>;
}