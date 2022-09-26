const controller={};

const generaRta=require('../modules/dbfunctions');
const Personas=require('../models/personas');
const Cuentas = require('../models/cuentas');
const Contactos = require('../models/contactos');
const TipoFamiliar = require('../models/tipofamiliar');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Personas.findAll({
    include: [{
      model: Cuentas, as: 'cuenta',
      attributes:{exclude: ['createdAt','updatedAt']}
    },
    {
      model: Contactos, as: 'contactos',
      attributes:{exclude: ['createdAt','updatedAt','tipofamiliarId','familiarId','personaId']},
      include: [{
        model: TipoFamiliar, as: 'tipofamiliar',
        attributes:{exclude: ['createdAt','updatedAt']}
      }]
    }
    ],
    attributes:{exclude: ['cuentaId']}
  }));
}

module.exports=controller; 