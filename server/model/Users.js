var Sequelize=require('sequelize');
var database=require('./database');

var Users=database.define('User',{
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: Sequelize.STRING
});

module.exports=Users;