const Personajes = require('../models/personajes');
const generaRta=require('../modules/dbfunctions');
const controllerValija={};

controllerValija.adquirir=(req,res)=>{
  const {personajeId,valijaSeleccionadaId, nuevoPuntajeAcumulado}=req.body;
 
  return generaRta(req,res,Personajes.update({
    valijaId: valijaSeleccionadaId,
    puntajeAcumulado: nuevoPuntajeAcumulado
  },{where:{id:personajeId}}))
}

module.exports=controllerValija;