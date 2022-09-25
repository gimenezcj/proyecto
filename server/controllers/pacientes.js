const controller={};

const generaRta=require('../modules/dbfunctions');
const Pacientes=require('../models/pacientes');
const Personas=require('../models/personas');
const Cuentas=require('../models/cuentas');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Pacientes.findAll(
  {
    include: [{
      model: Personas, 
      attributes:{exclude: ['personaId','createdAt','updatedAt']},
      include:[{
        model: Cuentas,
        attributes:{exclude: ['createdAt','updatedAt']}
      }]
    }],
    attributes: {exclude:['createdAt','updatedAt','personaId','fonoaudiologoId']}
  }));
} 

module.exports=controller;