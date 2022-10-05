const Sequelize=require('sequelize');
const database=require('./database');
const ResultadosActividades=require('./resultadosactividades');

const ResultadosComprarProductos=database.define('resultadosComprarProductos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  equivocoSeleccion: Sequelize.BOOLEAN,
  ordenQueSelecciono: Sequelize.STRING
});

ResultadosComprarProductos.belongsTo(ResultadosActividades,{foreignKey: 'resultadoActividadId',as: 'resultadoActividad'});

ResultadosComprarProductos.sync();

module.exports=ResultadosComprarProductos;