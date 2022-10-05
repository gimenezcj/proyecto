'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('escenarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sueloPlanoId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sueloColisionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      fondoId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')        
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('escenarios');
  }
};