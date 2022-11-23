const Sequelize=require('sequelize');
const ComprarProductos = require('./comprarProductos');
const database=require('./database');
const Imagenes = require('./imagenes');

const Productos=database.define('productos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  comprarProductoId: Sequelize.INTEGER,
  nombre: Sequelize.STRING,
  precio: Sequelize.FLOAT,
  imagenId: Sequelize.INTEGER,
  hayAyudaSonora: Sequelize.BOOLEAN,
  ayudaSonoraId: Sequelize.INTEGER
});

Productos.belongsTo(Imagenes, {as:'imagen', foreignKey: 'imagenId'})
Productos.belongsTo(Imagenes, {as:'sonido', foreignKey: 'ayudaSonoraId'})
Productos.belongsTo(ComprarProductos,{ as: 'comprarProducto', foreignKey: 'comprarProductoId'});
ComprarProductos.hasMany(Productos,{ as: 'productos', foreignKey: 'comprarProductoId'})

Productos.sync();

module.exports=Productos;