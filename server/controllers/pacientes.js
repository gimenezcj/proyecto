const controller={};

const generaRta=require('../modules/dbfunctions');
const Pacientes=require('../models/pacientes');
const Personas=require('../models/personas');
const Cuentas=require('../models/cuentas');
const Fonoaudiologos=require('../models/fonoaudiologos');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Pacientes.findAll(
  {
    include: [
      {
        model: Personas, as: 'persona',
        attributes:{exclude: ['cuentaId','createdAt','updatedAt']},
      include:[{
        model: Cuentas,
        attributes:{exclude: ['createdAt','updatedAt']}
      }]
      },
      {
        model: Fonoaudiologos, as: 'fono',
        attributes:{exclude: ['personaId','createdAt','updatedAt']},

      }
    ],
    attributes: {exclude:['createdAt','updatedAt','personaId']}
  }));
} 

module.exports=controller;