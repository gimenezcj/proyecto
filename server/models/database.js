require('dotenv').config();
var Sequelize = require('sequelize');

const database=new Sequelize (
  'gama_database_development',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

database.sync();

module.exports=database;