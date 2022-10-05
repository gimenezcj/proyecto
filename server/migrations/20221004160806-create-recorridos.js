'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recorridos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      xInicial: {
        type: Sequelize.INTEGER
      },
      yInicial: {
        type: Sequelize.INTEGER
      },
      xAFinal: {
        type: Sequelize.INTEGER
      },
      yAFinal: {
        type: Sequelize.INTEGER
      },
      xBFinal: {
        type: Sequelize.INTEGER
      },
      yBFinal: {
        type: Sequelize.INTEGER
      },
      puntaje: {
        type: Sequelize.INTEGER
      },
      actividadDisponibleId: {
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
    await queryInterface.dropTable('recorridos');
  }
};