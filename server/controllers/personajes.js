const controller={};

const DecorativosAvatar = require('../models/decorativosavatar');
const Imagenes = require('../models/imagenes');
const Personajes = require('../models/personajes');
const generaRta=require('../modules/dbfunctions');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Personajes.findAll({
    attributes:{exclude: ['createdAt','updatedAt','pacienteId','imagenId']},
    include: [{
      model: DecorativosAvatar,
      attributes:{exclude: ['createdAt','updatedAt','imagenId'],},
      include: {model: Imagenes, as: 'imagen',attributes:{exclude: ['createdAt','updatedAt']}}
    },{
      model: Imagenes, as: 'imagen',
      attributes:{exclude: ['createdAt','updatedAt']}
    }]
  }));
}

controller.adquirir=(req,res)=>{
  const {personajeId,personajeSeleccionadoId, nuevoPuntajeAcumulado}=req.body;

  console.log(personajeId,personajeSeleccionadoId, nuevoPuntajeAcumulado);

  return generaRta(req,res,Personajes.update({
    imagenId: personajeSeleccionadoId,
    puntajeAcumulado: nuevoPuntajeAcumulado
  },{where:{id:personajeId}}))
}

module.exports=controller;