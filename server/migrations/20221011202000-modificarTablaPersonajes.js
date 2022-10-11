'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('personajes','volanteId',{type: Sequelize.INTEGER}),
      queryInterface.addColumn('personajes','tableroId',{type: Sequelize.INTEGER}),
      queryInterface.addColumn('personajes','valijaId',{type: Sequelize.INTEGER})
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('personajes', 'valijaId'),
      queryInterface.removeColumn('personajes', 'tableroId'),
      queryInterface.removeColumn('personajes', 'volanteId')
    ]);
  }
};