var Sequelize=require('sequelize');
var database=require('./database');

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

Personas.sync();

module.exports=Personas;