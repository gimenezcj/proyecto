const controller={};

const Decorativos = require('../models/decorativos');
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

controller.personaje=(req,res)=> {
    const { peronajeId } = req.params;
    res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
    res.set("Pragma", "no-cache");
    res.set("Expires", 0);

  return generaRta(req,res,Personajes.findByPk(peronajeId,{
    attributes: {  exclude:['createdAt','updatedAt','pacienteId','imagenId','valijaId','volanteId','tableroId']},
    include: [ 
      {
        model: Decorativos, as: 'tablero', attributes: {  
          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
      },
      {
        model: Decorativos, as: 'volante', attributes: {  
          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
      },
      {
        model: Decorativos, as: 'valija' , attributes: { 
          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
      },
      {
        model: Decorativos, as: 'imagen',attributes: {  
          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
      }  /*,
      {model: GrupoDecorativos, attributes: {  exclude:['id','createdAt','updatedAt']}, through: { attributes: [] }} */
    ]
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