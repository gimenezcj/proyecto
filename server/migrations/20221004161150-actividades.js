'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('actividades', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rehabilitacionId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      actividadDisponibleId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      orden: {
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
    await queryInterface.dropTable('actividades');
  }
};