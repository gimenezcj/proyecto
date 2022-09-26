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

Contactos.familiar=Contactos.belongsTo(Personas,{
  foreignKey: 'familiarId',
  as: 'familiar'
});
////
Contactos.tipoFamiliar=Contactos.belongsTo(TipoFamiliar,{
  foreignKey: 'tipofamiliarId'
});

Contactos.persona=Contactos.belongsTo(Personas,{
  foreignKey: 'personaId',
  as: 'persona'
});

Contactos.sync();

module.exports=Contactos;