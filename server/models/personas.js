var Sequelize=require('sequelize');
var database=require('./database');
var Contactos=require('./contactos');
var Cuentas=require('./cuentas');

var Personas=database.define('Personas',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
  dni: Sequelize.STRING
});
Personas.hasMany(Contactos, {
  foreignKey: 'contactoId',
  as: 'contactos'
});
Personas.hasOne(Cuentas,{
  foreignKey: 'cuentaId',
  as: 'cuenta' 
})
module.exports=Personas;