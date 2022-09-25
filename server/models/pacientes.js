var Sequelize=require('sequelize');
var database=require('./database');
var Personas=require('./personas');
var Fonoaudiologos=require('./fonoaudiologos');

var Pacientes=database.define('Pacientes',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nroAfiliado: Sequelize.STRING
});
Personas.hasMany(Fonoaudiologos, {
  foreignKey: 'fonoaudiologoId',
  as: 'Fonoaudiologos'
});
Personas.hasOne(Personas,{
  foreignKey: 'personaId',
  as: 'persona' 
})
module.exports=Pacientes;