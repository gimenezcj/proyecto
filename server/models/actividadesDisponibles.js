const Sequelize=require('sequelize');
const database=require('./database');

const Recorridos=require('./recorridos');
const Escenarios = require('./escenarios');

const ActividadesDisponibles=database.define('actividadesDisponibles',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  estimuloVisual: Sequelize.STRING,
  estimuloAuditivo: Sequelize.STRING,
  puntosAOtorgar: Sequelize.INTEGER,
  timpoMaximoResolucion: Sequelize.DATE,
  detalle: Sequelize.STRING,
  dificultad: Sequelize.ENUM('bajo','medio','alto')
});

ActividadesDisponibles.belongsTo(Recorridos, {foreignKey: 'recorridoId', as: 'recorrido'});

Escenarios.hasMany(ActividadesDisponibles, {foreignKey: 'escenarioId', as: 'actividadesDisponibles'});

ActividadesDisponibles.sync();
Escenarios.sync();

module.exports=ActividadesDisponibles;