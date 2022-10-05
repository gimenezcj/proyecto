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
  actividadId: Sequelize.INTEGER
});

ResultadosActividades.belongsTo(Actividades, {foraingKey:'actividadId', as: 'actividad'});

ResultadosActividades.sync();

module.exports=ResultadosActividades;