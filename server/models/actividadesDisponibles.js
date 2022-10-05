const Sequelize=require('sequelize');
const database=require('./database');
const Actividades=require('./actividades');
const Recorridos=require('./recorridos');

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

ActividadesDisponibles.sync();

module.exports=ActividadesDisponibles;