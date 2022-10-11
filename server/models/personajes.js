const Sequelize=require('sequelize');
const database=require('./database');
const DecorativosAvatar = require('./decorativosavatar');
const Imagenes = require('./imagenes');
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
Personajes.belongsTo(Imagenes, {foreignKey: 'imagenId', as: 'imagen'});
Personajes.belongsTo(Imagenes, {foreignKey: 'volanteId', as: 'volante'});
Personajes.belongsTo(Imagenes, {foreignKey: 'tableroId', as: 'tablero'});
Personajes.belongsTo(Imagenes, {foreignKey: 'valijaId', as: 'valija'});

Pacientes.hasOne(Personajes, {foreignKey: 'pacienteId', as: 'personaje'});

Pacientes.sync();
Personajes.sync();
DecorativosAvatar.sync();

module.exports=Personajes;