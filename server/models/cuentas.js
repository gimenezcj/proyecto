const Sequelize=require('sequelize');
const database=require('./database');
const Personas=require('./personas');
const Imagenes=require('./imagenes');

const Cuentas=database.define('cuentas',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clave: Sequelize.STRING,
  usuario: Sequelize.STRING,
  activo: Sequelize.BOOLEAN
});
 
Cuentas.belongsTo(Personas,{foreignKey: 'personaId', as: 'persona'});
Cuentas.belongsTo(Imagenes,{foreignKey: 'imagenId', as: 'imagen'});

Personas.hasOne(Cuentas, {foreignKey: 'personaId', as: 'cuenta'});

Personas.sync();
Cuentas.sync();

module.exports=Cuentas;