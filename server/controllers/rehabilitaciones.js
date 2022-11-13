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
    where: {pacienteId:pacienteId},
    include: [
      {
        model: Escenarios, as: 'escenario',attributes:{exclude: ['createdAt','updatedAt']}
      },{
        model: Actividades, as: 'actividades2', 
        attributes:{exclude: ['createdAt','updatedAt','rehabilitacionId','actividadDisponibleId']},order:[['orden','ASC']],
        include: [
          {model: ActividadesDisponibles, as: 'actividadDisponible',
          attributes:{exclude: ['createdAt','updatedAt','recorridoId','escenarioId']}}]
      }
    ],
    attributes:{exclude: ['createdAt','updatedAt','escenarioId']}
  }))
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
    Actividades.findAll({where: {rehabilitacionId:rehabilitacionId}})
    .then(actividad=>actividad.map(i=>i.destroy())
    );
    rehabilitacion.destroy()
    .then(cantidad=>{
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