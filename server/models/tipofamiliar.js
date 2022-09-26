var Sequelize=require('sequelize');
var database=require('./database');

var TipoFamiliar=database.define('tipofamiliars',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: Sequelize.STRING,
});

TipoFamiliar.sync();

module.exports=TipoFamiliar;