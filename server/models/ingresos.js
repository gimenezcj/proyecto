var Sequelize=require('sequelize');
var database=require('./database');
var Cuentas=require('./cuentas');

var Ingresos=database.define('ingresos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaHora: Sequelize.DATE
});

Cuentas.hasMany(Ingresos,{foreignKey: 'cuentaId', as: 'ingresos'});

Cuentas.sync();
Ingresos.sync();

module.exports=Ingresos;