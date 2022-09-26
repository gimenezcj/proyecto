var Sequelize=require('sequelize');
var database=require('./database');
var Cuentas=require('./cuentas');
//var Contactos=require('./contactos');

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

Personas.belongsTo(Cuentas,{foreignKey: 'cuentaId',as: 'cuenta'});

Personas.sync();

module.exports=Personas;