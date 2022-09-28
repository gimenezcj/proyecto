var Sequelize=require('sequelize');
var database=require('./database');
const Pacientes=require('./pacientes');

var EvaluacionesPresenciales=database.define('evaluacionesPresenciales',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: Sequelize.DATE
  observacion: Sequelize.STRING,
  dificultad: Sequelize.INTEGER
});

EvaluacionesPresenciales.belongsTo(Pacientes, {foreignKey: 'pacienteId', as: 'paciente'});

EvaluacionesPresenciales.sync();

module.exports=Contactos;