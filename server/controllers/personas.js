const controller={};

const generaRta=require('../modules/dbfunctions');
const Personas=require('../models/personas');
const Cuentas = require('../models/cuentas');
const Contactos = require('../models/contactos');
const Imagenes = require('../models/imagenes');
const Familiares=require('../models/familiares');
const Ingresos=require('../models/ingresos');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Personas.findAll({
    include: [
    {
      model: Cuentas, as: 'cuenta',
      attributes:{exclude: ['createdAt','updatedAt','imagenId']},
      include: [
        {model: Imagenes, as: 'imagen',attributes:{exclude: ['createdAt','updatedAt']}},
        {model: Ingresos, as: 'ingresos'}
      ]
    },
    {
      model: Contactos, as: 'contactos',
      attributes:{exclude: ['createdAt','updatedAt','personaId']}
    },
    {model: Familiares, as: 'familiares',attributes:{exclude: ['createdAt','updatedAt','personaId']}}
    ],
    attributes:{exclude: ['cuentaId','createdAt','updatedAt']}
  }));
}

module.exports=controller; 