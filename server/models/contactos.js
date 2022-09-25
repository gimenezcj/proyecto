var Sequelize=require('sequelize');
var database=require('./database');
var TipoFamiliar=require('./tipofamiliar');

var Contactos=database.define('contactos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  celular: Sequelize.STRING,
  fijo: Sequelize.STRING
});

Contactos.hasOne(TipoFamiliar, {
  foreignKey: 'tipofamiliarId',
  as: 'tipoFamiliar'
});

module.exports=Contactos;