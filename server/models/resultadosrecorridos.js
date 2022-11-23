const Sequelize=require('sequelize');
const Actividades = require('./actividades');
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
  recorrioTiempo: Sequelize.INTEGER,
  actividadId: Sequelize.INTEGER
});

ResultadosRecorridos.belongsTo(Actividades, {foreingKey: 'actividadId', as: 'actividad'});
Actividades.hasMany(ResultadosRecorridos,{foreingKey: 'actividadId', as: 'resultadosRecorridos'});

Actividades.sync();
ResultadosRecorridos.sync();

module.exports=ResultadosRecorridos; 