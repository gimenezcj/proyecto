'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resultadosActividades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ayudaAuditiva: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      ayudaVisual: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      completado: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      inicio: {
        type: Sequelize.DATE
      },
      finalizo: {
        type: Sequelize.DATE
      },
      tiempoTranscurrido: {
        type: Sequelize.INTEGER
      },
      actividadId: {
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
    await queryInterface.dropTable('resultadosActividades');
  }
};