const controller={};

const generaRta=require('../modules/dbfunctions');
const Cuentas=require('../models/cuentas');
const Ingresos = require('../models/ingresos');
const Imagenes = require('../models/imagenes');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Cuentas.findAll({
    attributes:{exclude: ['createdAt','updatedAt']},
    include: [
      {
        model: Ingresos, as: 'ingresos',
        attributes:{exclude: ['createdAt','updatedAt','cuentaId','imagenId']}
      },
      {
        model: Imagenes, as: 'imagen',
        attributes:{exclude: ['createdAt','updatedAt']}
      }
    ]
  }));
}

module.exports=controller;