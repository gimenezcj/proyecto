const Sequelize=require('sequelize');
const {gte, lte, between, gt, lt, and,or} = Sequelize.Op;

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
const ComprarProductos=require('../models/comprarProductos');
const Productos = require('../models/productos');
const ResultadosActividades = require('../models/resultadosactividades');
const ResultadosComprarProductos = require('../models/resultadoscomprarproductos');
const ResultadosRecorridos = require('../models/resultadosrecorridos');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Rehabilitaciones.findAll({
    include: [
      {
        model: Pacientes, as: 'paciente',attributes:{exclude: ['createdAt','updatedAt']}
      },
      {
        model: Escenarios, as: 'escenario',attributes:{exclude: ['createdAt','updatedAt']}
      }
    ]
  }));
}

controller.porPaciente=(req,res)=>{
  const {pacienteId}=req.params;
  return generaRta(req,res,Rehabilitaciones.findAll({
    where: {pacienteId:pacienteId,activo:true},
    include: [
      {
        model: Escenarios, as: 'escenario',attributes:{exclude: ['createdAt','updatedAt']}
      },{
        model: Actividades, as: 'actividades2', 
        attributes:{exclude: ['createdAt','updatedAt','rehabilitacionId','actividadDisponibleId']},order:[['orden','ASC']],
        include: [
          {model: ActividadesDisponibles, as: 'actividadDisponible',
          attributes:{exclude: ['createdAt','updatedAt','recorridoId','escenarioId']}},
          {
            model: ResultadosActividades, as: 'resultadosActividades', required: false,
            attributes: { exclude:['createdAt','updatedAt','actividadId','inicio','finalizo','ayudaAuditiva','ayudaVisual','tiempoTranscurrido']},
          }
        ]
      }
    ],
    attributes:{exclude: ['createdAt','updatedAt','escenarioId']}
  }))
}

controller.pendientesPorPaciente=(req,res)=>{
  const {pacienteId}=req.params;
  return generaRta(req,res,Rehabilitaciones.findAll({
    attributes: { exclude:['createdAt','updatedAt','fechaCreacion','pacienteId','fonoaudiologoId','escenarioId','fechaRealizacion','realizada']},                     
    where: { [and]: [
      {fechaHabilitadaDesde:{ [lt]: new Date().toISOString().split('T')[0] }}, 
      {fechaHabilitadaHasta: {[gt]: new Date().toISOString().split('T')[0]}},
      {pacienteId:pacienteId},
      {realizada:false},{activo:true}
    ]},
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
            attributes: { exclude:['createdAt','updatedAt']},
            include: [
              {
                model: ResultadosComprarProductos, as: 'resultadoComprarProductos', required: false,
              }
            ]
          },                              
          {
            model: ResultadosRecorridos, as: 'resultadosRecorridos', required: false,                              
          }

        ]
      }
    ]
  }
  ))
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
  const {rehabilitacionId}=req.params; 
  return generaRta(req,res,ActividadesDisponibles.findByPk(rehabilitacionId,{
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

controller.eliminar=(req,res)=> {
  const {rehabilitacionId}=req.params;

  Rehabilitaciones.findByPk(rehabilitacionId)
  .then(rehabilitacion=>{

//    Actividades.findAll({where: {rehabilitacionId:rehabilitacionId}})
//    .then(actividad=>actividad.map(i=>i.destroy())
//    );
//    rehabilitacion.destroy()
    rehabilitacion.update({activo:false})
    .then((cantidad,que)=>{
      return  res.json({cantidad: cantidad, deleted: true, operation:'deleted'});
    })
  })

}

controller.nueva=(req,res)=>{
  const {fonoaudiologoId,pacienteId}= req.params;
  const {rehabilitacion}=req.body;

  Rehabilitaciones.create({fonoaudiologoId:fonoaudiologoId, pacienteId:pacienteId, escenarioId: rehabilitacion.escenario.id,
    fechaHabilitadaDesde: rehabilitacion.fechaHabilitadaDesde, fechaHabilitadaHasta: rehabilitacion.fechaHabilitadaHasta})
  .then(r=>{
    if(rehabilitacion.actividades2.length>0)
    {
      rehabilitacion.actividades2.map((v,i)=>{
//        console.log({rehabilitacionId: r.id,actividadDisponibleId: v.id,orden:(i+1)});
        Actividades.create({rehabilitacionId: r.id,actividadDisponibleId: v.actividadDisponible.id,orden:(i+1)})
        .catch(function(error){
          return res.json({estado:'error',error:error});
        })
      });
    }
    return res.json({estado:'creada',id:r.id});
  })
  .catch(error=>{
//    console.log(error);
    return res.json({estado:'error',error:error});
  });
    
}

controller.actualizar=(req,res)=>{
  const {rehabilitacion}=req.body;


  Rehabilitaciones.findByPk(rehabilitacion.id)
  .then(r=>{
    r.update({
      fechaHabilitadaDesde: rehabilitacion.fechaHabilitadaDesde, 
      fechaHabilitadaHasta: rehabilitacion.fechaHabilitadaHasta, 
      escenarioId: rehabilitacion.escenario.id});
    Actividades.destroy({where:{rehabilitacionId: rehabilitacion.id}})
    .then(x=>{
      rehabilitacion.actividades2.map((a,k)=>Actividades.create({rehabilitacionId: r.id, actividadDisponibleId: a.actividadDisponible.id,orden: k}));
      return res.json({estado:'actualizado',rehabilitacion: rehabilitacion});
    })
  })

//  console.log(rehabilitacion);
  

//  return generaRta(req,res,Rehabilitaciones.create({
//
//  }))
}
module.exports=controller;