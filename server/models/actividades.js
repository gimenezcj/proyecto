const Sequelize=require('sequelize');
const database=require('./database');
const Rehabilitaciones=require('./rehabilitaciones');
const ActividadesDisponibles=require('./actividadesDisponibles');

const Actividades=database.define('actividades',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rehabilitacionId: Sequelize.INTEGER,
  actividadDisponibleId: Sequelize.INTEGER,
  orden: Sequelize.INTEGER
},{
  name: {
    singular: 'actividad',
    plural: 'actividades',
  }
});

//Actividades.belongsTo(Rehabilitaciones, {foreingKey: 'rehabilitacionId', as: 'rehabilitacion'});
Actividades.belongsTo(ActividadesDisponibles, {foreingKey: 'actividadDisponibleId', as: 'actividadDisponible'});
Rehabilitaciones.hasMany(Actividades, {foreignKey: 'rehabilitacionId', as: 'actividades2'});

ActividadesDisponibles.belongsToMany(Rehabilitaciones, {through: Actividades, foreignKey: 'actividadDisponibleId'});
Rehabilitaciones.belongsToMany(ActividadesDisponibles, {through: Actividades, foreignKey: 'rehabilitacionId'});

ActividadesDisponibles.sync();
Rehabilitaciones.sync();
Actividades.sync();

module.exports=Actividades;