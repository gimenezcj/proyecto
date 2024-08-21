const Sequelize=require('sequelize');
const database=require('./database');
const ResultadosActividades=require('./resultadosactividades');
const moment = require('moment');

const ResultadosRecorridos=database.define('resultadosRecorridos',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  chocoElemento: Sequelize.BOOLEAN,
  chocoCasa: Sequelize.BOOLEAN,
  sinCombustible: Sequelize.BOOLEAN,
  completo: Sequelize.BOOLEAN,
  fecha: {
    type:Sequelize.DATE,
/*    get(){
   const rawValue = this.getDataValue('inicio')      
      return moment(rawValue).format('DD/MM/YYYY h:mm:ss');
      return new Date(this.getDataValue('inicio'));
    }*/
  },
  recorrioDistancia: Sequelize.INTEGER,
  recorrioTiempo: Sequelize.INTEGER,
  actividadId: Sequelize.INTEGER
});

ResultadosRecorridos.belongsTo(ResultadosActividades, {foreignKey: 'actividadId'});

ResultadosActividades.hasMany(ResultadosRecorridos,{foreignKey: 'actividadId', as: 'resultadosRecorridos'});

ResultadosRecorridos.sync();
ResultadosActividades.sync();


module.exports=ResultadosRecorridos; 