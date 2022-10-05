'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('rehabilitaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fechaCreacion: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      fechaRealizacion: {
        allowNull: true,
        type: Sequelize.DATE
      },
      realizada: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      fonoaudiologoId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      pacienteId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      escenarioId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dificultad: {
        allowNull: false,
        type: Sequelize.ENUM('bajo','medio','alto'),
        defaultValue: 'bajo'
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
    await queryInterface.dropTable('rehabilitaciones');
  }
};