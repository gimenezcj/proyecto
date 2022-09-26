var Sequelize=require('sequelize');
var database=require('./database');
const Personas = require('./personas');
var TipoFamiliar=require('./tipofamiliar');

var Contactos=database.define('contactos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  celular: Sequelize.STRING,
  fijo: Sequelize.STRING
});

Contactos.belongsTo(TipoFamiliar,{foreignKey: 'tipofamiliarId', as:'tipofamiliar'});
Contactos.belongsTo(Personas    ,{foreignKey: 'personaId',      as:'persona'});
Contactos.belongsTo(Personas    ,{foreignKey: 'familiarId',     as:'familiar'});

Personas.hasMany(Contactos,{foreignKey: 'personaId', as: 'contactos'});

Contactos.sync();

module.exports=Contactos;