var Sequelize=require('sequelize');
var database=require('./database');
var Personas=require('./personas');
//var Pacientes=require('./pacientes');

var Fonoaudiologos=database.define('fonoaudiologos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  matricula: Sequelize.STRING,
});

Fonoaudiologos.belongsTo(Personas,{foreignKey: 'personaId', as: 'persona'});

Fonoaudiologos.sync();

module.exports=Fonoaudiologos;