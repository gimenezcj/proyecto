var Sequelize=require('sequelize');
var database=require('./database');

var Ingresos=database.define('Ingresos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaHora: Sequelize.DATE
});

module.exports=Ingresos;