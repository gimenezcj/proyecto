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
  ordenQueSelecciono: Sequelize.STRING,
  resultadoActividadId: Sequelize.INTEGER,
  cuando: Sequelize.INTEGER,
  productoId: Sequelize.INTEGER
});

ResultadosComprarProductos.belongsTo(ResultadosActividades,{foreignKey: 'resultadoActividadId',as: 'resultadoActividad'});
ResultadosActividades.hasOne(ResultadosComprarProductos, {foreignKey: 'resultadoActividadId',as: 'resultadoComprarProductos'})

ResultadosComprarProductos.sync();

module.exports=ResultadosComprarProductos;