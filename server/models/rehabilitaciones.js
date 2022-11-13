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
  fechaCreacion: { 
    type: Sequelize.DATE,
    allowNull: true
  },
  fechaRealizacion: Sequelize.DATE,
  fechaHabilitadaDesde: Sequelize.DATE,
  fechaHabilitadaHasta: Sequelize.DATE,
  realizada: Sequelize.BOOLEAN,
  dificultad: {
    type: Sequelize.ENUM('bajo','medio','alto'),
    defaultValue: 'bajo'
  }
});

Rehabilitaciones.belongsTo(Pacientes, {foreignKey:'pacienteId', as: 'paciente'});
Rehabilitaciones.belongsTo(Fonoaudiologos, {foreignKey:'fonoaudiologoId', as: 'fono'});
Rehabilitaciones.belongsTo(Escenarios, {foreignKey:'escenarioId', as: 'escenario'});

Pacientes.hasMany(Rehabilitaciones,{foreignKey: 'pacienteId', as: 'rehabilitaciones'});
//Escenarios.hasMany(Rehabilitaciones,{foreignKey: 'escenarioId',as: 'rehabilitaciones'});

Rehabilitaciones.sync();
Pacientes.sync();

module.exports=Rehabilitaciones;