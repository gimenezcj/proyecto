const controller={};

const generaRta=require('../modules/dbfunctions');
const Pacientes=require('../models/pacientes');
const Personas=require('../models/personas');
const Cuentas=require('../models/cuentas');
const Fonoaudiologos=require('../models/fonoaudiologos');
const Rehabilitaciones = require('../models/rehabilitaciones');
const ObrasSociales = require('../models/obrassociales');
const Contactos = require('../models/contactos');
const Personajes=require('../models/personajes');

controller.listAll=(req,res)=>{
  return generaRta(req,res,Pacientes.findAll(
  {
    include: [
      {
        model: Personas, as: 'persona',
        attributes:{exclude: ['cuentaId','createdAt','updatedAt']},
        include:[{
          model: Cuentas, as: 'cuenta',
          attributes:{exclude: ['createdAt','updatedAt']}
        }]
      },
      {
        model: Fonoaudiologos, as: 'fono',
        attributes:{exclude: ['personaId','createdAt','updatedAt']},

      }
    ],
    attributes: {exclude:['createdAt','updatedAt','personaId']}
  }));
} 

controller.getOne=(req,res)=>{
  
  const {id}=req.params;

  return generaRta(req,res,Pacientes.findByPk(id,
  {
    include: [
      {
        model: Personas, as: 'persona',
        attributes:{exclude: ['cuentaId','createdAt','updatedAt']},
        include:[{
          model: Cuentas, as: 'cuenta',
          attributes:{exclude: ['createdAt','updatedAt','personaId','imagenId']}
        },
        { model: Contactos, as: 'contactos',attributes:{exclude: ['createdAt','updatedAt','personaId']}}]
      },
      { model: ObrasSociales, as: 'obraSocial',attributes:{exclude: ['createdAt','updatedAt']}},
      

    ],
    attributes: {exclude:['createdAt','updatedAt','personaId','fonoaudiologoId','obraSocialId']}
  }));
} 

controller.eliminar=(req,res)=> {
  const {id}=req.params;

  Pacientes.findByPk(id)
  .then(paciente=>{
    paciente.destroy()
    .then(cantidad=>{
      return  res.json({cantidad: cantidad, deleted: true, operation:'deleted'});
    })
  })

}

controller.guardar=(req,res) => {

  const ceroONulo=(valor)=>{
    return (!valor||valor==='');
  }

  const {paciente}=req.body;

  if(!paciente.id){
    //es un paciente nuevo
    console.log('nuevo');
//    console.log(paciente);

    Personas.create({nombre:paciente.persona.nombre,apellido:paciente.persona.apellido,dni:paciente.persona.dni})
    .then(nuevaPersona=>{
      cuenta= Cuentas.create({clave: paciente.persona.cuenta.clave ,usuario:paciente.persona.cuenta.usuario, activo:true,personaId: nuevaPersona.id});
      contacto= Contactos.create({
        celular:paciente.persona.contactos[0].celular,
        fijo: paciente.persona.contactos[0].fijo,
        email: paciente.persona.contactos[0].email,
        personaId: nuevaPersona.id});
      sinObraSocial=(ceroONulo(paciente.obraSocial.id)||paciente.obraSocial.id===1);
      Pacientes.create({fonoaudiologoId: paciente.profesionalId,nroAfiliado: paciente.nroAfiliado,obraSocialId:(sinObraSocial?1:paciente.obraSocial.id),personaId: nuevaPersona.id})
      .then(nuevoPaciente=>{
//      if(!ceroONulo(paciente.persona.constactos[0].celular)||!ceroONulo(paciente.persona.constactos[0].fijo)||!ceroONulo(paciente.persona.constactos[0].email)) {
      
        const obraSocial=  ObrasSociales.findByPk((sinObraSocial?1:paciente.obraSocial.id))
        .then(os=>{
          const vector={
            id: nuevoPaciente.id,
            nroAfiliado: paciente.nroAfiliado,
            obraSocial: {
              id: os.id,
              nombre: os.nombre},
            persona: {
              id: paciente.persona.id,
              dni: paciente.persona.dni,
              nombre: paciente.persona.nombre,
              apellido: paciente.persona.apellido,
              contactos: paciente.persona.contactos
            }
          }
          Personajes.create({nombre:'sin nombre', puntajeAcumulado:100, pacienteId: nuevoPaciente.id, volanteId: 20, tableroId:24, valijaId: 19, imagenId:50});


//          console.log(vector);
          return  res.json({item: vector, created: true, operation:'new'});
        });
      });    

      
    });
  } else {
    console.log('actualizar');
//    console.log(paciente);
    //es para actualizar un paciente

    const persona= Personas.update({nombre:paciente.persona.nombre,apellido:paciente.persona.apellido,dni:paciente.persona.dni},{where:{id:paciente.persona.id}})
    .then(item=>{
      sinObraSocial=(ceroONulo(paciente.obraSocial.id)||paciente.obraSocial.id===1);
      const cuenta=Cuentas.update({clave: paciente.persona.cuenta.clave ,usuario:paciente.persona.cuenta.usuario, activo:true,personaId: item.id},{where:{id:paciente.persona.cuenta.id }});
      const pacienteAct=Pacientes.update({nroAfiliado: paciente.nroAfiliado,obraSocialId:(sinObraSocial?1:paciente.obraSocial.id)},{where:{id:paciente.id}});
      const contactos= Contactos.update({celular:paciente.persona.contactos[0].celular,
        fijo: paciente.persona.contactos[0].fijo,
        email: paciente.persona.contactos[0].email},{where:{id:paciente.persona.contactos[0].id}});
      const obraSocial=  ObrasSociales.findByPk((sinObraSocial?1:paciente.obraSocial.id))
      .then(os=>{
//        console.log(item);
        const vector={
          id: paciente.id,
          nroAfiliado: paciente.nroAfiliado,
          obraSocial: {
            id: os.id,
            nombre: os.nombre},
          persona: {
            id: paciente.persona.id,
            dni: paciente.persona.dni,
            nombre: paciente.persona.nombre,
            apellido: paciente.persona.apellido,
            contactos: paciente.persona.contactos}
        }

//        console.log(item,vector);

        return  res.json({item: vector, updated: true, operation:'update'});
  
      })
    });

  }
}

module.exports=controller;

//{
//  id:paciente.id,
//  dni: paciente.persona.dni,
//  nombreCompleto: paciente.persona.apellido +', '+ paciente.persona.nombre,
//  nroAfiliado:paciente.nroAfiliado ,
//  obraSocial:os.nombre
//}