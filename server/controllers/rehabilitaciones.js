const controller={};

const generaRta=require('../modules/dbfunctions');
const Rehabilitaciones=require('../models/rehabilitaciones');
const Pacientes = require('../models/pacientes');
const Escenarios = require('../models/escenarios');
const Imagenes = require('../models/imagenes');

const Actividades=require('../models/actividades');
const ActividadesDisponibles=require('../models/actividadesDisponibles');
const Recorridos = require('../models/recorridos');
const DistractoresDisponibles = require('../models/distractoresDisponibles');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Rehabilitaciones.findAll({
    include: [
      {
        model: Pacientes, as: 'paciente'
      },
      {
        model: Escenarios, as: 'escenario'
      }
    ]
  }));
}

controller.list=(req,res)=>{
  const {id}=req.params;
  return generaRta(req,res,Rehabilitaciones.findByPk(id,{
    include:[
      {model: Pacientes, as: 'paciente'},
      {model: ActividadesDisponibles}
    ]
  }));
}

controller.getRoadFromActivity=(req,res)=>{
  const {id}=req.params; 
  return generaRta(req,res,ActividadesDisponibles.findByPk(id,{
    include:[
      {
        model: Recorridos, as: 'recorrido',
        attributes:{exclude: ['createdAt','updatedAt','actividadDisponibleId']},
        include:[
          {
            model: DistractoresDisponibles,
            attributes:{exclude: ['createdAt','updatedAt','imagenId']},
            include: [{model: Imagenes, as: 'imagen',attributes:{exclude: ['createdAt','updatedAt']}}]}
        ]
      }
    ],
    attributes: { exclude:['createdAt','updatedAt','recorridoId']} 
  }));
}

module.exports=controller;