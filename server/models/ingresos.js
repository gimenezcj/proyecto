const Sequelize=require('sequelize');
const database=require('./database');
const Cuentas=require('./cuentas');

const Ingresos=database.define('ingresos',{
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