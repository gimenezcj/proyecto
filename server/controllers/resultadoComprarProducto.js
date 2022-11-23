const Sequelize=require('sequelize');
const {gte, lte, between, gt, lt, and,or} = Sequelize.Op;
const Actividades = require('../models/actividades');
const Rehabilitaciones = require('../models/rehabilitaciones');
const ResultadosActividades = require('../models/resultadosactividades');
const ResultadosComprarProductos = require('../models/resultadoscomprarproductos');
const Personajes = require('../models/personajes');

const controller={};

controller.agregar=(req,res)=>{
  const {rehabilitacionId,actividadId,seleccion,puntosAOtorgar,personajeId}=req.body;
  const {ayudaVisual,ayudaAuditiva,completado,inicio,fin,selecciones}= seleccion;

  console.log(rehabilitacionId,actividadId,selecciones);

  ResultadosActividades.create({ayudaVisual: ayudaVisual, ayudaAuditiva: ayudaAuditiva,completado:completado, inicio:inicio, finalizo:fin, actividadId: actividadId})
  .then(r=>{  
    selecciones.map((v,i)=>{
      ResultadosComprarProductos.create({cuando:Math.round(v.tiempo/1000), productoId: v.id, resultadoActividadId: r.id});
    })
    if(completado) {
      Personajes.findByPk(personajeId)
      .then(paciente=>{
        const nuevo=paciente.puntajeAcumulado+puntosAOtorgar;
        paciente.update({puntajeAcumulado: nuevo})
      });
      
      Actividades.findAll({
        where: {rehabilitacionId: rehabilitacionId}, attributes: {exclude: ["orden","createdAt","updatedAt",'rehabilitacionId']},
        include: [
          {
            model: ResultadosActividades, as: 'resultadosActividades', attributes:{exclude:[
              "id", "inicio","finalizo","ayudaAuditiva","ayudaVisual","tiempoTranscurrido","actividadId","createdAt","updatedAt"
            ]}, require: false      
          }
        ]
      })
      .then((data)=>{
        console.log(data);
        const aux=data.map((v,i)=>v.resultadosActividades.filter(x=>x.completado).length);
        if(aux.filter(x=>x>0).length===aux.length)
          Rehabilitaciones.update({realizada: true,fechaRealizacion: new Date() },{where:{id:rehabilitacionId}})
      });
    }  
  });
};

controller.prueba=async (req,res) => {
  const {rehabilitacionId}=req.body;

  const response= await Actividades.findAll({
    where: {rehabilitacionId: rehabilitacionId}, attributes: {exclude: ["orden","createdAt","updatedAt",'rehabilitacionId']},
    include: [
      {
        model: ResultadosActividades, as: 'resultadosActividades', attributes:{exclude:[
          "id", "inicio","finalizo","ayudaAuditiva","ayudaVisual","tiempoTranscurrido","actividadId","createdAt","updatedAt"
        ]}, require: false      
      }
    ]
  })
  .then((data)=>{
    const aux=data.map((v,i)=>v.resultadosActividades.filter(x=>x.completado).length);
    const aux2=(aux.filter(x=>x>0).length===aux.length)

    return {cosa:aux2}
  });
  return res.json(response);
}

module.exports=controller;