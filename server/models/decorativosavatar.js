const Sequelize=require('sequelize');
const database=require('./database');
const Imagenes = require('./imagenes');

var DecorativosAvatar=database.define('decorativosAvatares',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: Sequelize.STRING,
  x: Sequelize.INTEGER,
  y: Sequelize.INTEGER,
  tipo: Sequelize.ENUM('sticker', 'vestimenta')
});

DecorativosAvatar.belongsTo(Imagenes,{foreignKey: 'imagenId', as: 'imagen'});

DecorativosAvatar.sync();

module.exports=DecorativosAvatar;