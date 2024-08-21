const Sequelize=require('sequelize');
const {gte, lte, between, gt, lt, and,or} = Sequelize.Op;
const controller={};

const generaRta=require('../modules/dbfunctions');
const Fonoaudiologos=require('../models/fonoaudiologos');
const Personas=require('../models/personas');
const Pacientes = require('../models/pacientes');
const Rehabilitaciones  = require('../models/rehabilitaciones');
const Personajes        = require('../models/personajes');
const GrupoDecorativos  = require('../models/grupodecorativos');
const Decorativos       = require('../models/decorativos');
const Imagenes          = require('../models/imagenes');
const Actividades       = require('../models/actividades');
const ActividadesDisponibles = require('../models/actividadesDisponibles');
const Escenarios =        require('../models/escenarios');
const Recorridos =        require('../models/recorridos');
const ComprarProductos =  require('../models/comprarProductos.js');
const Productos = require('../models/productos');
const ResultadosActividades = require('../models/resultadosactividades');
const ResultadosComprarProductos = require('../models/resultadoscomprarproductos');
const ResultadosRecorridos = require('../models/resultadosrecorridos');
const ObrasSociales     = require('../models/obrassociales');

controller.resultadoRehabilitacion=(req,res) => {
  const {idActividad}=req.params;
  return generaRta(req,res,ResultadosActividades.findAll({
      include: [
        {
          model: ResultadosRecorridos, as: 'resultadosRecorrido'
        },
        {
          model: ResultadosComprarProductos, as: 'resultadosComprarProductos',
          include: [{model: Productos, as: 'producto'}]
        }      
      ],
      attributes:{exclude: ['createdAt','updatedAt','actividadId']},
      where: {actividadId:idActividad}
  }));
}

controller.resultadoRecorridos=(req,res) => {
  const {idActividad}=req.params;
  return generaRta(req,res, ResultadosRecorridos.findAll({
    include: [{model: ResultadosActividades, where: {actividadId:idActividad},attributes: []}],
    attributes:{exclude: ['createdAt','updatedAt','actividadId']},    
  })); 
}

controller.resultadoRehabilitacionResumen=(req, res) => {
  const {idRehabilitacion}= req.params;
  return generaRta(req,res, Rehabilitaciones.findByPk(idRehabilitacion,{
    include: [
      {model: Escenarios, as: 'escenario', attributes:{exclude: ['createdAt','updatedAt','id','sueloPlanoId','sueloColisionId','fondoId']}},
      {model: Actividades, as: 'actividades2', attributes:{exclude: ['createdAt','updatedAt','rehabilitacionId','actividadDisponibleId']},
      include:[
        {model: ActividadesDisponibles, as: 'actividadDisponible', attributes:{
          exclude: ['createdAt','updatedAt','recorridoId','escenarioId','estimuloVisual','estimuloAuditivo','puntosAOtorgar','detalle','estimuloAuditivoId']
        }},
        {model: ResultadosActividades, attributes:{ exclude: ['createdAt','updatedAt','actividadId']}
        }
      ]}
    ],
    attributes:{exclude: ['createdAt','updatedAt','pacienteId','fonoaudiologoId','escenarioId']}
  }))
}

controller.listAll=(req,res)=>{
  return generaRta(req,res,Fonoaudiologos.findAll({
    include: [
      {
        model: Personas, as: 'persona',
        attributes:{exclude: ['createdAt','updatedAt','cuentaId']}
      },
      {
        model: Pacientes, as: 'pacientes',
        attributes:{exclude: ['createdAt','updatedAt','fonoaudiologoId']}
      }
    ],
    attributes:{exclude: ['createdAt','updatedAt','personaId']},
  }));
}

controller.listPacientes=(req,res)=>{
  const {id}=req.params;
  return generaRta(req,res,Fonoaudiologos.findByPk(id,{
    include: [
      {
        model: Pacientes, as: 'pacientes', where: {activo:true},
        attributes:{exclude: ['createdAt','updatedAt','fonoaudiologoId']},
        include: [
          {model: ObrasSociales, as: 'obraSocial', attributes: { exclude:['createdAt','updatedAt']}},
          {
            model: Personas, as: 'persona', attributes: {  exclude:['createdAt','updatedAt']},
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
          },                  
          {
            model: Rehabilitaciones, as: 'rehabilitaciones',
            attributes: { exclude:['createdAt','updatedAt','fechaCreacion','pacienteId','fonoaudiologoId','escenarioId','fechaRealizacion','realizada']}                     
            , where: { [and]: [{fechaHabilitadaDesde:{ [lt]: new Date().toISOString().split('T')[0] }}, {fechaHabilitadaHasta: {[gt]: new Date().toISOString().split('T')[0]}}]},
            required: false,
            include: [
              {
                model: Escenarios, as: 'escenario',
                attributes: { exclude:['createdAt','updatedAt','id','sueloPlanoId','sueloColisionId','fondoId']},
                include: [
                  {model: Imagenes, as: 'fondo',attributes: { exclude:['createdAt','updatedAt','id']}},                          
                  {model: Imagenes, as: 'sueloPlano',attributes: { exclude:['createdAt','updatedAt','id']}},
                  {model: Imagenes, as: 'sueloColision',attributes: { exclude:['createdAt','updatedAt','id']}}
                ]
              },
              {
                model: Actividades, as: 'actividades2', required: false,  order:[[{ model: Actividades, as: 'actividades2'},'orden','ASC']],
                attributes: { exclude:['createdAt','updatedAt','rehabilitacionId','actividadDisponibleId']},
                include: [
                  {
                    model: ActividadesDisponibles, as: 'actividadDisponible', 
                    attributes: { exclude:['createdAt','updatedAt','id','estimuloAuditivoId','escenarioId','recorridoId']},
                    include: [
                      {model: Recorridos, as: 'recorrido',attributes: { exclude:['createdAt','updatedAt','id']}},
                      {model: Imagenes, as: 'sonido',attributes: { exclude:['createdAt','updatedAt','id']}},
                      {model: ComprarProductos, as: 'comprarProducto',required: false,
                        attributes: { exclude:['createdAt','updatedAt','id','actividadId']},
                        include: [
                          {model: Productos, as: 'productos',attributes: { exclude:['createdAt','updatedAt','id','ayudaSonoraId','imagenId','comprarProductoId']},
                            include: [
                              {model: Imagenes, as: 'imagen',attributes: { exclude:['createdAt','updatedAt','id']}},
                              {model: Imagenes, as: 'sonido',attributes: { exclude:['createdAt','updatedAt','id']}}
                            ]
                          }
                        ]
                      },

                    ]
                  },{
                    model: ResultadosActividades, as: 'resultadosActividades', required: false,
                    include: [
                      {
                        model: ResultadosComprarProductos, as: 'resultadosComprarProductos'
                      },                              
                  {
                    model: ResultadosRecorridos, as: 'resultadosRecorridos', required: false,                              
                  }
                    ]
                  }

                ]
              }
            ]
          }
        ]
      }
    ],
    attributes:{exclude: ['createdAt','updatedAt','personaId']},
  }));
}

module.exports=controller;