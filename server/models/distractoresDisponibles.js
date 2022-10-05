const Sequelize=require('sequelize');
const database=require('./database');
const Imagenes = require('./imagenes');

const DistractoresDisponibles=database.define('distractoresDisponibles',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ejecuarEnBuble: Sequelize.BOOLEAN,
  nombre: Sequelize.STRING,
  x: Sequelize.INTEGER,
  y: Sequelize.INTEGER,
  ruta: Sequelize.STRING,
  tiempoEspera: Sequelize.INTEGER,
  tiempoInicial: Sequelize.INTEGER,
  tipo: Sequelize.ENUM('sonido','niebla','lluvia','atardecer','noche','obstaculo'),
  imagenId: Sequelize.INTEGER
});

DistractoresDisponibles.belongsTo(Imagenes,{foreingKey: 'imagenId', as: 'imagen'});

DistractoresDisponibles.sync();

module.exports=DistractoresDisponibles; 