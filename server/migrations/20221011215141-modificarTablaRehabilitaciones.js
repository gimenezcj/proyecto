'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('rehabilitaciones','fechaHabilitadaDesde',{type: Sequelize.DATE}),
      queryInterface.addColumn('rehabilitaciones','fechaHabilitadaHasta',{type: Sequelize.DATE})
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('rehabilitaciones', 'fechaHabilitadaHasta'),
      queryInterface.removeColumn('rehabilitaciones', 'fechaHabilitadaDesde')
    ]);
  }
};
