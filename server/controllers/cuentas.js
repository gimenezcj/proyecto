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
const Decorativos = require('../models/decorativos');
const Fonoaudiologos = require('../models/fonoaudiologos');
const ObrasSociales = require('../models/obrassociales');

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
  res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
  res.set("Pragma", "no-cache");
  res.set("Expires", 0);

    try {
        const response=await Cuentas.findAll({
        where: {usuario:usuario,clave:clave},
        include:[
          {model: Imagenes, as: 'imagen' , attributes: {  exclude:['createdAt','updatedAt']}},
          {model: Personas, as: 'persona', attributes: {  exclude:['createdAt','updatedAt','dni']},
            include:[
              {
                model: Pacientes, as: 'paciente', 
                attributes: {  exclude:['createdAt','updatedAt','personaId','obraSocialId','fonoaudiologoId','']},
                include: [
                  {
                    model: Rehabilitaciones, as: 'rehabilitaciones',
                    attributes: { 
                      exclude:['createdAt','updatedAt','fechaCreacion','pacienteId','fonoaudiologoId','escenarioId','fechaRealizacion','realizada']}
                  },
                  {
                    model: Personajes, as: 'personaje',
                    attributes: {  exclude:['createdAt','updatedAt','pacienteId','imagenId','valijaId','volanteId','tableroId']},
                    include: [ 
                      {
                        model: Decorativos, as: 'tablero', attributes: {  
                          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
                        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
                      },
                      {
                        model: Decorativos, as: 'volante', attributes: {  
                          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
                        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
                      },
                      {
                        model: Decorativos, as: 'valija' , attributes: { 
                          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
                        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
                      },
                      {
                        model: Decorativos, as: 'imagen',attributes: {  
                          exclude:['createdAt','updatedAt','x','y','valor','baseId','nroPieza','auxiliarId']},
                        include: [{model: Imagenes, as: 'imagenBase', attributes: {  exclude:['id','createdAt','updatedAt']}}]
                      }  /*,
                      {model: GrupoDecorativos, attributes: {  exclude:['id','createdAt','updatedAt']}, through: { attributes: [] }} */
                    ]
                  }
                ]
            },
            {
              model: Fonoaudiologos, as: 'fonoaudiologo', 
              attributes: {  exclude:['createdAt','updatedAt','personaId']},
              include: [
                {
                  model: Pacientes, as: 'pacientes',
                  attributes: { exclude:['createdAt','updatedAt','personaId','fonoaudiologoId','obraSocialId']},
                  include: [
                    {model: ObrasSociales, as: 'obraSocial', attributes: { exclude:['createdAt','updatedAt']}},
                    {model: Personas, as: 'persona', attributes: { exclude:['createdAt','updatedAt']}}
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
};

controller.logout=async (req, res)=>{
  //const {usuario,clave}=req.body;
  res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
  res.set("Pragma", "no-cache");
  res.set("Expires", 0);

  return res.json({success:true,mensaje: 'logout', token:undefined});
}

controller.verificar=async(req,res)=>{
  const {nombreUsuario}= req.params;

  Cuentas.findAll({where:{usuario:nombreUsuario}})
  .then(encontrados=>{
    if(!encontrados.length)
      return res.json({success:true,mensaje: 'no encontrado', encontrado:false, nombreUsuario: nombreUsuario})
    else
    return res.json({success:true,mensaje: 'encontrado', encontrado:true, cantidad: encontrados.length, nombreUsuario: nombreUsuario});
  })

  res.set("Cache-Control", "no-cache, no-store, must-revalidate, max-age=0");
  res.set("Pragma", "no-cache");
  res.set("Expires", 0);
  

}

module.exports=controller;