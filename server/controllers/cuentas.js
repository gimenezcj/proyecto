const Sequelize=require('sequelize');
const {gte, lte} = Sequelize.Op;

const controller={};

const generaRta=require('../modules/dbfunctions');

const Cuentas=require('../models/cuentas');
const Ingresos = require('../models/ingresos');
const Imagenes = require('../models/imagenes');
const Personas = require('../models/personas');
const Pacientes = require('../models/pacientes');
const Rehabilitaciones = require('../models/rehabilitaciones');
const Personajes = require('../models/personajes');
const GrupoDecorativos = require('../models/grupodecorativos');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Cuentas.findAll({
    attributes:{exclude: ['createdAt','updatedAt']},
    include: [
      {
        model: Ingresos, as: 'ingresos',
        attributes:{exclude: ['createdAt','updatedAt','cuentaId','imagenId']}
      },
      {
        model: Imagenes, as: 'imagen',
        attributes:{exclude: ['createdAt','updatedAt']}
      }
    ]
  }));
}
const generaToken = function() {
  return Math.random().toString(36);
};

controller.login=async (req, res)=>{
  const {usuario,clave}=req.body;
    try {
        const response=await Cuentas.findAll({
        where: {usuario:usuario,clave:clave},
        include:[
          {model: Imagenes, as: 'imagen' , attributes: {  exclude:['id','createdAt','updatedAt']}},
          {model: Personas, as: 'persona', attributes: {  exclude:['id','createdAt','updatedAt','dni']},
            include:[
              {
                model: Pacientes, as: 'paciente', 
                attributes: {  exclude:['id','createdAt','updatedAt','personaId','obraSocialId','fonoaudiologoId','']},
                include: [
                  {
                    model: Rehabilitaciones, as: 'rehabilitaciones',
                    attributes: { 
                      exclude:['createdAt','updatedAt','fechaCreacion','pacienteId','fonoaudiologoId','escenarioId','fechaRealizacion','realizada']}
                  },
                  {
                    model: Personajes, as: 'personaje',
                    attributes: {  exclude:['id','createdAt','updatedAt','pacienteId','imagenId','valijaId','volanteId','tableroId']},
                    include: [ 
                      {model: Imagenes, as: 'tablero', attributes: {  exclude:['id','createdAt','updatedAt']}},
                      {model: Imagenes, as: 'volante', attributes: {  exclude:['id','createdAt','updatedAt']}},
                      {model: Imagenes, as: 'valija' , attributes: {  exclude:['id','createdAt','updatedAt']}},
                      {model: Imagenes, as: 'imagen',attributes: {  exclude:['id','createdAt','updatedAt']}},
                      {model: GrupoDecorativos, attributes: {  exclude:['id','createdAt','updatedAt']}, through: { attributes: [] }}
                    ]
                  }
                ]
              }]
          },
        ],
        attributes: {  exclude:['id','imagenId','personaId','usuario', 'clave','createdAt','updatedAt'],
        where: { fechaHabilitacionDesde:{ [lte]: new Date() }, fechaHabilitacionHasta: {[gte]: new Date()}}
        }
      })
      .then((data)=>{
        if(data.length != 0){
          data[0].token=generaToken();
          var res={success:true,message: 'encontrado', token: {info:data[0], token: generaToken()}}}
        else
          var res={success:false,message: 'no coinciden los datos'}
        return res;})
      .catch(error=>{
        const res={success:false,error:error}
        return res;});
      return res.json(response);
    } catch (e) {
      console.log('Error controller login');
      console.log(e);
    }
}

module.exports=controller;