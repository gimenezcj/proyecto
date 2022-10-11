const Sequelize=require('sequelize');
const database=require('./database');

const Adquiridos=database.define('adquiridos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nroPieza: Sequelize.INTEGER,
  personajeId: Sequelize.INTEGER,
  grupoDecorativoId: Sequelize.INTEGER
});

Adquiridos.sync();

module.exports=Adquiridos;