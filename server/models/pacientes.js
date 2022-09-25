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
//Personas.hasMany(Fonoaudiologos, {
//  foreignKey: 'fonoaudiologoId',
//  as: 'Fonoaudiologos'
//});
//Personas.hasOne(Pacientes,{
//  foreignKey: 'personaId',
//  as: 'persona' 
//})

///Personas.hasOne(Pacientes,{
///  foreignKey: 'personaId',
///  as: 'personas'
///});
Pacientes.persona=Pacientes.belongsTo(Personas);
Pacientes.fonoaudiologo=Pacientes.belongsTo(Fonoaudiologos);

Pacientes.sync();

module.exports=Pacientes;