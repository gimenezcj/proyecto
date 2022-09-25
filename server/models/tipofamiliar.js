var Sequelize=require('sequelize');
var database=require('./database');

var TipoFamiliar=database.define('tipofamiliar',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: Sequelize.STRING,
});

module.exports=TipoFamiliar;