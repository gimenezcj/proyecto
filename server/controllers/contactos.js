const controller={};

const generaRta=require('../modules/dbfunctions');
const Contactos=require('../models/contactos');
const TipoFamiliar = require('../models/tipofamiliar');
const Personas = require('../models/personas');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Contactos.findAll({
    include: [
      {
        model: TipoFamiliar, as: 'tipofamiliar',
        attributes:{exclude: ['createdAt','updatedAt']}
      },
      {
        model: Personas, as: 'familiar',
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