var Sequelize=require('sequelize');
var database=require('./database');
var Imagenes=require('./imagenes');

var Cuentas=database.define('cuentas',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clave: Sequelize.STRING,
  email: Sequelize.STRING,
  usuario: Sequelize.STRING,
  activo: Sequelize.BOOLEAN
});
 
Cuentas.imagen=Cuentas.hasOne(Imagenes,{
  foreignKey: 'imagenId'
});

Cuentas.sync();

module.exports=Cuentas;