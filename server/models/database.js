require('dotenv').config();
var Sequelize = require('sequelize');

const database=new Sequelize (
  process.env.DB_DABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

database.sync();

module.exports=database;