const controller={};

const generaRta=require('../modules/dbfunctions');
const Fonoaudiologos=require('../models/fonoaudiologos');
const Personas=require('../models/personas');
const Pacientes = require('../models/pacientes');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Fonoaudiologos.findAll({
    include: [
      {
        model: Personas, as: 'persona',
        attributes:{exclude: ['createdAt','updatedAt']}
      },
//      {
//        model: Pacientes, as: 'fono'
//      }
    ],
    attributes:{exclude: ['createdAt','updatedAt','personaId']},

  }));
}

module.exports=controller;