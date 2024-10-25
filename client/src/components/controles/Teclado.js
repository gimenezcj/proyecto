import React, { useEffect, useState } from 'react';
import {Image} from 'react-bootstrap';
import { useGamepads } from 'react-gamepads';
import { useInterval } from 'usehooks-ts'

import config from '../../config/config.json';


const TipoBoton={
    Menos1:1,Mas1:2,Variable:4,Axe:8,Button:16
}

export default function Teclado({comandos},{setComandos}) {

    return <Image src={config.ICONOS+'teclado.png '}  height='40vw' />

}