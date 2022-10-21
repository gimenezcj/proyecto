'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('decorativos','x', {type: Sequelize.INTEGER,allowNull: true}),
      queryInterface.changeColumn('decorativos','y', {type: Sequelize.INTEGER,allowNull: true}),
      queryInterface.changeColumn('decorativos','nroPieza', {type: Sequelize.INTEGER,allowNull: true}),
      queryInterface.changeColumn('decorativos','valor', {type: Sequelize.INTEGER,allowNull: true}),
      queryInterface.changeColumn('decorativos','auxiliarId', {type: Sequelize.INTEGER,allowNull: true})
    ]);
  },

  async down (queryInterface, Sequelize) {
  }
};
