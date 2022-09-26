var Sequelize=require('sequelize');
var database=require('./database');

var Imagenes=database.define('imagenes',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreArchivo: Sequelize.STRING
});

Imagenes.sync();

module.exports=Imagenes;