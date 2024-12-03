import React, { useEffect} from 'react';
import {Image} from 'react-bootstrap';
import PropTypes from 'prop-types';

import config from '../../config/config.json';

export default function Teclado({comandos},{setComandos}) {

/*     Teclado.prototype={
        bSetActivo: PropTypes.func.isRequired
    }
    const {bSetActivo}=Teclado;

    useEffect(()=>{
        bSetActivo(true);
    },[]); */

    return <Image src={config.ICONOS+'teclado.png '}  height='40vw' />

}