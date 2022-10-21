var Sequelize=require('sequelize');
var database=require('./database');

var ObrasSociales=database.define('obrasSociales',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING
});

ObrasSociales.sync();

module.exports=ObrasSociales;