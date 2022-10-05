const Sequelize=require('sequelize');
const database=require('./database');

const comprarProductos=database.define('comprarProductos',{
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

comprarProductos.sync();

module.exports=comprarProductos; 