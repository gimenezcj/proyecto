const Sequelize=require('sequelize');
const database=require('./database');
const Personas = require('./personas');

const Contactos=database.define('contactos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  celular: Sequelize.STRING,
  fijo: Sequelize.STRING,
  email: Sequelize.STRING
});

//Contactos.belongsTo(Personas    ,{foreignKey: 'personaId',      as:'persona'});
//Contactos.belongsTo(Personas    ,{foreignKey: 'familiarId',     as:'familiar'});

//Personas.hasMany(Contactos,{foreignKey: 'personaId', as: 'contactos'});
Personas.hasMany(Contactos, {foreingKey: 'personaId', as: 'contactos'});

Personas.sync();
Contactos.sync();

module.exports=Contactos;