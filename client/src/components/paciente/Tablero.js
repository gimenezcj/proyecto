import React from "react";

export default function Tablero (){
  return (
    <>
      <div style={{position: 'absolute',top: '0px', width: '100%', height: '100%', left: '0px',overflow: 'hidden'}}>
        <div  style={{ 
          width: '100%',height: '100%',backgroundSize: 'cover',background: 'url("imagenes/avatares/tablero/tableroPrisma.png")   center center / cover no-repeat fixed',

          }}></div>
      </div>
    </>
  );
}