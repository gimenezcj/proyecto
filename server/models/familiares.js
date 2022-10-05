const Sequelize=require('sequelize');
const database=require('./database');
const Personas=require('./personas');

var Familiares=database.define('familiares',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  familiar: Sequelize.ENUM('hijo','padre','tio','hermano','sobrino','ahijado','primo')
});

Familiares.belongsTo(Personas, {foreignKey: 'familiarId', as: 'persona'});
Personas.hasMany (Familiares, {foreignKey: 'personaId', as: 'familiares'});

//Personas.belongsToMany(Personas, { through: Familiares, foreignKey: 'familiarId'});

Personas.sync();
Familiares.sync();

module.exports=Familiares;