const Sequelize=require('sequelize');
const ActividadesDisponibles = require('./actividadesDisponibles');
const database=require('./database');

const ComprarProductos=database.define('comprarProductos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  actividadId: Sequelize.INTEGER,
  cantidadItems: Sequelize.INTEGER,
  estimuloAuditivo: Sequelize.BOOLEAN,
  estimuloVisual: Sequelize.BOOLEAN
});

ComprarProductos.belongsTo    (ActividadesDisponibles ,{ as: 'actividadDisponible', foreignKey: 'actividadId'});
ActividadesDisponibles.hasOne (ComprarProductos       ,{ as: 'comprarProducto'     , foreignKey: 'actividadId'});

ComprarProductos.sync();
ActividadesDisponibles.sync();

module.exports=ComprarProductos; 