const Sequelize=require('sequelize');
const database=require('./database');
const DecorativosAvatar = require('./decorativosavatar');
const Decorativos = require('./decorativos');
const Pacientes = require('./pacientes');

var Personajes=database.define('personajes',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  puntajeAcumulado: Sequelize.INTEGER
});

DecorativosAvatar.belongsToMany(Personajes, { through: 'personajesDecorativos', foreignKey: 'decoId'});
Personajes.belongsToMany(DecorativosAvatar, { through: 'personajesDecorativos', foreignKey: 'personajeId'});

Personajes.belongsTo(Pacientes, {foreignKey:'pacienteId', as: 'paciente'});
Personajes.belongsTo(Decorativos, {foreignKey: 'imagenId', as: 'imagen'});
Personajes.belongsTo(Decorativos, {foreignKey: 'volanteId', as: 'volante'});
Personajes.belongsTo(Decorativos, {foreignKey: 'tableroId', as: 'tablero'});
Personajes.belongsTo(Decorativos, {foreignKey: 'valijaId', as: 'valija'});

Pacientes.hasOne(Personajes, {foreignKey: 'pacienteId', as: 'personaje'});

Pacientes.sync();
Personajes.sync();
DecorativosAvatar.sync();

module.exports=Personajes;