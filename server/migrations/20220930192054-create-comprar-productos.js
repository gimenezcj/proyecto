'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comprarProductos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      actividadId: {
        type: Sequelize.INTEGER
      },
      cantidadItems: {
        type: Sequelize.INTEGER
      },
      estimuloAuditivo: {
        type: Sequelize.BOOLEAN
      },
      estimuloVisual: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('comprarProductos');
  }
};