const Sequelize=require('sequelize');
const database=require('./database');
const GrupoDecorativos = require('./grupodecorativos');
const Imagenes = require('./imagenes');
//const Personajes = require('./personajes');

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
Decorativos.belongsTo(Imagenes, {foreignKey: 'auxiliarId', as: 'imagenAuxiliar'});
Imagenes.hasMany (Decorativos, {foreignKey: 'auxiliarId', as: 'decorativos'});

//Personajes.belongsTo(Decorativos, {foreignKey: 'imagenId', as: 'imagen'});
//Personajes.belongsTo(Decorativos, {foreignKey: 'volanteId', as: 'volante'});
//Personajes.belongsTo(Decorativos, {foreignKey: 'tableroId', as: 'tablero'});
//Personajes.belongsTo(Decorativos, {foreignKey: 'valijaId', as: 'valija'});

Imagenes.sync();
Decorativos.sync();
//Personajes.sync();

module.exports=Decorativos;