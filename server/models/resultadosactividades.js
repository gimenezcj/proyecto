const Sequelize=require('sequelize');
const database=require('./database');
const Actividades=require('./actividades');

const ResultadosActividades=database.define('resultadosActividades',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inicio: Sequelize.DATE,
  finalizo: Sequelize.DATE,
  ayudaAuditiva: Sequelize.BOOLEAN,
  ayudaVisual: Sequelize.BOOLEAN,
  completado: Sequelize.BOOLEAN,
  tiempoTranscurrido: Sequelize.INTEGER,
  actividadId: {
    type: Sequelize.INTEGER,
  } 
});

ResultadosActividades.belongsTo(Actividades , {foraingKey: 'actividadId', as: 'actividad'});
Actividades.hasMany(ResultadosActividades   , {foraingKey: 'actividadId', as: 'resultadosActividades'})

Actividades.sync();
ResultadosActividades.sync();

module.exports=ResultadosActividades;