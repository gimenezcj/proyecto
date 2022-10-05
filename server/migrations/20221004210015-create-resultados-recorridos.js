'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('resultadosRecorridos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chocoElemento: {
        type: Sequelize.BOOLEAN
      },
      chocoCasa: {
        type: Sequelize.BOOLEAN
      },
      completo: {
        type: Sequelize.BOOLEAN
      },
      fecha: {
        type: Sequelize.DATE
      },
      recorrioDistancia: {
        type: Sequelize.INTEGER
      },
      recorrioTiempo: {
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
    await queryInterface.dropTable('resultadosRecorridos');
  }
};