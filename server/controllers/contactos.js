const controller={};

const generaRta=require('../modules/dbfunctions');
const Contactos=require('../models/contactos');
const Personas = require('../models/personas');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Contactos.findAll({
    include: [
      {
        model: Personas, as: 'familiares',
        attributes:{exclude: ['createdAt','updatedAt','cuentaId']}
      },
      {
        model: Personas, as: 'persona',
        attributes:{exclude: ['createdAt','updatedAt','cuentaId']}
      }
    ],
    attributes:{exclude: ['createdAt','updatedAt','tipofamiliarId','familiarId','personaId']},
  }));
}

module.exports=controller;