var Sequelize=require('sequelize');
var database=require('./database');
var Personas=require('./personas');
var Fonoaudiologos=require('./fonoaudiologos');

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

Fonoaudiologos.hasMany(Pacientes, {foreignKey: 'fonoaudiologoId', as: 'pacientes'});

Pacientes.sync();

module.exports=Pacientes;