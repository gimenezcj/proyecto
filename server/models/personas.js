var Sequelize=require('sequelize');
var database=require('./database');
var Cuentas=require('./cuentas');


var Personas=database.define('personas',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
  dni: Sequelize.STRING
});
//Personas.hasMany(Contactos, {
//  foreignKey: 'contactoId',
//  as: 'contactos'
//});
//Personas.hasOne(Cuentas,{
//  foreignKey: 'cuentaId',
//  as: 'cuenta' 
//})
//Personas.hasOne(Pacientes,{
//  foreignKey: 'personaId',
//  as: 'persona' 
//}) 

Personas.cuenta=Personas.belongsTo(Cuentas,{
  foreignKey: 'cuentaId'
});


//Personas.contactos=Personas.belongsToMany(Contactos,{
//  foreignKey: 'personaId'
//});

Personas.sync();

module.exports=Personas;