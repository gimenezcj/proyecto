const controller={};

const generaRta=require('../modules/dbfunctions');
const Escenarios=require('../models/escenarios');
const Imagenes = require('../models/imagenes');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Escenarios.findAll({
    include: [
      {
        model: Imagenes, as: 'fondo',
        attributes: {exclude: ['createdAt','updatedAt','id']}
      },{
        model: Imagenes, as: 'sueloPlano',
        attributes: {exclude: ['createdAt','updatedAt','id']}
      }, {
        model: Imagenes, as: 'sueloColision',
        attributes: {exclude: ['createdAt','updatedAt','id']}
      }],
    attributes: {exclude: ['createdAt','updatedAt','sueloPlanoId','sueloColisionId','fondoId']}
  }));
}

module.exports=controller;