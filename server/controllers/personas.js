const controller={};

const generaRta=require('../modules/dbfunctions');
const Personas=require('../models/personas');
const Cuentas = require('../models/cuentas');
// const Contactos = require('../models/contactos');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Personas.findAll({
    include: [{
      model: Cuentas,
      attributes:{exclude: ['createdAt','updatedAt']}
    },
//    {
//      model: Contactos,
//    }
    ],
    attributes:{exclude: ['cuentaId']}
  }));
}

module.exports=controller;