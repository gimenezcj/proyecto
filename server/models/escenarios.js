const Sequelize=require('sequelize');
const database=require('./database');
const Imagenes = require('./imagenes');

const Escenarios=database.define('escenarios',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  descripcion: Sequelize.STRING
});

Escenarios.belongsTo(Imagenes,{foreignKey:'sueloPlanoId', as: 'sueloPlano'});
Escenarios.belongsTo(Imagenes,{foreignKey:'sueloColisionId', as: 'sueloColision'});
Escenarios.belongsTo(Imagenes,{foreignKey:'fondoId', as: 'fondo'});
Escenarios.sync();

module.exports=Escenarios;