const Sequelize=require('sequelize');
const database=require('./database');
const Escenarios = require('./escenarios');
const Fonoaudiologos = require('./fonoaudiologos');
const Pacientes = require('./pacientes');

const Rehabilitaciones=database.define('rehabilitaciones',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaCreacion: Sequelize.DATE,
  fechaRealizacion: Sequelize.DATE,
  fechaHabilitadaDesde: Sequelize.DATE,
  fechaHabilitadaHasta: Sequelize.DATE,
  realizada: Sequelize.BOOLEAN,
  dificultad: Sequelize.ENUM('bajo','medio','alto')
});

Rehabilitaciones.belongsTo(Pacientes, {foreignKey:'pacienteId', as: 'paciente'});
Rehabilitaciones.belongsTo(Fonoaudiologos, {foreignKey:'fonoaudiologoId', as: 'fono'});
Rehabilitaciones.belongsTo(Escenarios, {foreignKey:'escenarioId', as: 'escenario'});

Pacientes.hasMany(Rehabilitaciones,{foreignKey: 'pacienteId', as: 'rehabilitaciones'});
Escenarios.hasMany(Rehabilitaciones,{foreignKey: 'escenarioId',as: 'rehabilitaciones'});

Rehabilitaciones.sync();

module.exports=Rehabilitaciones;