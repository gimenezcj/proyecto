const Sequelize=require('sequelize');
const database=require('./database');
const GrupoDecorativos = require('./grupodecorativos');
const Imagenes = require('./imagenes');

const Decorativos=database.define('decorativos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  x: Sequelize.INTEGER,
  y: Sequelize.INTEGER,
  grupoDecorativoId: Sequelize.INTEGER,
  nroPieza: Sequelize.INTEGER,
  valor: Sequelize.INTEGER,
  baseId: Sequelize.INTEGER,
  auxiliarId: Sequelize.INTEGER
});

Decorativos.belongsTo(GrupoDecorativos, {foreignKey: 'grupoDecorativoId', as: 'grupodecorativo'});
Decorativos.belongsTo(Imagenes, {foreignKey: 'baseId', as: 'imagenBase'});
Imagenes.hasMany (Decorativos, {foreignKey: 'auxiliarId', as: 'decorativos'});

Imagenes.sync();
Decorativos.sync();

module.exports=Decorativos;