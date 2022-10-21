var Sequelize=require('sequelize');
var database=require('./database');
var Personas=require('./personas');
var Fonoaudiologos=require('./fonoaudiologos');
var ObrasSociales=require('./obrassociales');

var Pacientes=database.define('pacientes',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nroAfiliado: Sequelize.STRING
});

Pacientes.belongsTo(Personas,{foreignKey: 'personaId', as: 'persona'});
Pacientes.belongsTo(Fonoaudiologos,{foreignKey:'fonoaudiologoId', as: 'fono'});
Pacientes.belongsTo(ObrasSociales,{foreignKey: 'obraSocialId', as: 'obraSocial'});

Fonoaudiologos.hasMany(Pacientes, {foreignKey: 'fonoaudiologoId', as: 'pacientes'});

Personas.hasOne(Pacientes,{foreignKey:'personaId', as: 'paciente'});

Pacientes.sync();
Personas.sync();
Fonoaudiologos.sync();

module.exports=Pacientes;