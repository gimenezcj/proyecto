const Sequelize=require('sequelize');
const database=require('./database');

const Distractores=database.define('distractores',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orden: Sequelize.INTEGER,
  recorridoId: Sequelize.INTEGER,
  distractorDisponibleId: Sequelize.INTEGER
});

Distractores.sync();

module.exports=Distractores; 