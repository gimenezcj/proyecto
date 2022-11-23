const Sequelize=require('sequelize');
const database=require('./database');
const Distractores = require('./distractores');
const DistractoresDisponibles=require('./distractoresDisponibles');

const Recorridos=database.define('recorridos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  xInicial: Sequelize.INTEGER,
  yInicial: Sequelize.INTEGER,
  xAFinal: Sequelize.INTEGER,
  yAFinal: Sequelize.INTEGER,
  xBFinal: Sequelize.INTEGER,
  yBFinal: Sequelize.INTEGER,
  puntaje: Sequelize.INTEGER,
  giroInicial: Sequelize.INTEGER,
  actividadDisponibleId: Sequelize.INTEGER
});

Recorridos.belongsToMany(DistractoresDisponibles,{ through: 'distractores', foreignKey: 'recorridoId'})
DistractoresDisponibles.belongsToMany(Recorridos,{ through: 'distractores', foreignKey: 'distractorDisponibleId'})

//Recorridos.hasMany(Distractores,{foreignKey: 'recorridoId', as: 'distractores'});

Recorridos.sync();
DistractoresDisponibles.sync();

module.exports=Recorridos; 