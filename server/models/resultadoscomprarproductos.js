const Sequelize=require('sequelize');
const database=require('./database');
const ResultadosActividades=require('./resultadosactividades');
const Productos = require('./productos');

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
  productoId: Sequelize.INTEGER,
  opcionCorrecta: Sequelize.INTEGER,
  fechaInicio: Sequelize.DATE,
  fechaFinaliza: Sequelize.DATE,
  abandono: Sequelize.BOOLEAN,
  segundosQueSelecciono: Sequelize.STRING,
  listaItems: Sequelize.STRING,
  completo: Sequelize.BOOLEAN,
  ayudaVisual: Sequelize.STRING,
  ayudaSonora: Sequelize.STRING
});

ResultadosComprarProductos.belongsTo(ResultadosActividades,{foreignKey: 'resultadoActividadId',as: 'resultadoActividad'})
ResultadosComprarProductos.belongsTo(Productos,{foreignKey: 'productoId', as: 'producto'})

ResultadosActividades.hasMany(ResultadosComprarProductos, {foreignKey: 'resultadoActividadId',as: 'resultadosComprarProductos'})

ResultadosComprarProductos.sync();

ResultadosActividades.sync();

module.exports=ResultadosComprarProductos;