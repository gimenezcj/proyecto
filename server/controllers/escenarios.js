const controller={};

const generaRta=require('../modules/dbfunctions');
const Escenarios=require('../models/escenarios');
const Imagenes = require('../models/imagenes');
const ActividadesDisponibles= require('../models/actividadesDisponibles');

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
      },{
        model: ActividadesDisponibles, as: 'actividadesDisponibles',attributes: {exclude: ['createdAt','updatedAt','escenarioId']}
      }],
    attributes: {exclude: ['createdAt','updatedAt','sueloPlanoId','sueloColisionId','fondoId']}
  }));
}

module.exports=controller;