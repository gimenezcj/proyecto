var Sequelize=require('sequelize');
var database=require('./database');

var TipoFamiliar=database.define('TipoFamiliar',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: Sequelize.STRING,
});

module.exports=TipoFamiliar;