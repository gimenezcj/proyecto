var Sequelize=require('sequelize');
var database=require('./database');
var Personas=require('./personas');
var Pacientes=require('./pacientes');

var Fonoaudiologos=database.define('fonoaudiologos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  matricula: Sequelize.STRING,
});
Fonoaudiologos.hasOne(Personas,{
  foreignKey: 'personaId',
  as: 'persona' 
})
//Fonoaudiologos.hasMany(Pacientes,{
//  foreignKey: 'fonoaudiologoId',
//  as: 'pacientes' 
//}) 
module.exports=Fonoaudiologos;