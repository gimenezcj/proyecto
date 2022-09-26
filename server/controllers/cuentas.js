const controller={};

const generaRta=require('../modules/dbfunctions');
const Cuentas=require('../models/cuentas');
const Ingresos = require('../models/ingresos');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Cuentas.findAll({
    attributes:{exclude: ['createdAt','updatedAt']},
    include: [{
      model: Ingresos,
      attributes:{exclude: ['createdAt','updatedAt','cuentaId']}
    }]
  }));
}

module.exports=controller;