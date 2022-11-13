'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    
    await queryInterface.bulkUpdate('actividadesDisponibles',{escenarioId:1}, {id: {[Op.in]: [1,3]}});
    await queryInterface.bulkUpdate('actividadesDisponibles',{escenarioId:2}, {id: {[Op.in]: [2]}});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
