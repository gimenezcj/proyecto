var Sequelize=require('sequelize');
var database=require('./database');

var Imagenes=database.define('Imagenes',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreArchivo: Sequelize.STRING
});

module.exports=Imagenes;