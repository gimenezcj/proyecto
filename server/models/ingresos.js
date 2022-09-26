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

Ingresos.cuenta=Cuentas.hasMany(Ingresos,{
  foreignKey: 'cuentaId'
})
//Ingresos.cuenta=Ingresos.hasOne(Cuentas,{
//  foreignKey: 'cuentaId'
//});

Ingresos.sync();

module.exports=Ingresos;