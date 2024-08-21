const Sequelize=require('sequelize');
const database=require('./database');
const Actividades=require('./actividades');
const moment = require('moment');

const ResultadosActividades=database.define('resultadosActividades',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  inicio: {
    type:Sequelize.DATE,
/*    get(){
      const rawValue = this.getDataValue('inicio')      
      return moment(rawValue).format('DD/MM/YYYY h:mm:ss');;
    }*/
  },
  finalizo: {
    type:Sequelize.DATE,
/*    get(){
      const rawValue = this.getDataValue('inicio')      
      return moment(rawValue).format('DD/MM/YYYY h:mm:ss');;
    }*/
  },
  ayudaAuditiva: Sequelize.BOOLEAN,
  ayudaVisual: Sequelize.BOOLEAN,
  completado: Sequelize.BOOLEAN,
  tiempoTranscurrido: Sequelize.INTEGER,
/*  actividadId: {
    type: Sequelize.INTEGER,
  } */
});

ResultadosActividades.belongsTo(Actividades , {foreignKey: 'actividadId', as: 'actividad'});
Actividades.hasMany(ResultadosActividades   , {foreignKey: 'actividadId'})

Actividades.sync();
ResultadosActividades.sync();

module.exports=ResultadosActividades;