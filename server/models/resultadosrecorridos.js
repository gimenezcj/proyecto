const Sequelize=require('sequelize');
const database=require('./database');

const ResultadosRecorridos=database.define('resultadosRecorridos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chocoElemento: Sequelize.BOOLEAN,
  chocoCasa: Sequelize.BOOLEAN,
  completo: Sequelize.BOOLEAN,
  fecha: Sequelize.DATE,
  recorrioDistancia: Sequelize.INTEGER,
  recorrioTiempo: Sequelize.INTEGER
});

ResultadosRecorridos.sync();

module.exports=ResultadosRecorridos; 