var Sequelize=require('sequelize');
var database=require('./database');
var Ingresos=require('./ingresos');
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
 
Cuentas.hasMany(Ingresos, {
  foreignKey: 'cuentaId',
  as: 'ingresos'
});

Cuentas.hasOne(Imagenes,{
  foreignKey: 'imagenId',
  as: 'imagen'  
})

module.exports=Cuentas;