const Sequelize=require('sequelize');
const database=require('./database');
const Personajes = require('./personajes');

const GrupoDecorativos=database.define('grupoDecorativos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: Sequelize.STRING
});

//Personajes.belongsToMany(GrupoDecorativos, {through: 'adquiridos', foreignKey: 'personajeId'});
//GrupoDecorativos.belongsToMany(Personajes, {through: 'adquiridos', foreignKey: 'grupoDecorativoId'});

//Personajes.sync();
GrupoDecorativos.sync();

module.exports=GrupoDecorativos;