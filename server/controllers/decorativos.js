const controller={};

const generaRta=require('../modules/dbfunctions');
const Decorativos = require('../models/decorativos');
const Imagenes = require('../models/imagenes');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Decorativos.findAll({
    include: [
      {model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}},
      {model: Imagenes, as: 'imagenAuxiliar', attributes: {  exclude:['id','createdAt','updatedAt']}},
    ],
    attributes:{exclude: ['createdAt','updatedAt','baseId','auxiliarId']}
  }));
}

controller.listAny=(req,res)=>{
  const {grupoId}=req.body;
  return generaRta(req,res,Decorativos.findAll({
    include: [
      {model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}},
      {model: Imagenes, as: 'imagenAuxiliar', attributes: {  exclude:['id','createdAt','updatedAt']}},
    ],
    attributes:{exclude: ['createdAt','updatedAt','baseId','auxiliarId','grupoDecorativoId']},
    where: {grupoDecorativoId:grupoId}
  }));
}

module.exports=controller;