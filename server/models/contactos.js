var Sequelize=require('sequelize');
var database=require('./database');
var TipoFamiliar=require'(./TipoFamiliar');

var Contactos=database.define('Contactos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  celular: DataTypes.STRING,
  fijo: DataTypes.STRING
});

Contactos.hasOne(TipoFamiliar, {
  foreignKey: 'tipofamiliarId',
  as: 'tipoFamiliar'
});

module.exports=Contactos;