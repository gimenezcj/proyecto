const Sequelize=require('sequelize');
const database=require('./database');

const Productos=database.define('productos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comprarProductoId: Sequelize.INTEGER,
  nombre: Sequelize.STRING,
  precio: Sequelize.FLOAT,
  imagenId: Sequelize.INTEGER
});

Productos.sync();

module.exports=Productos;