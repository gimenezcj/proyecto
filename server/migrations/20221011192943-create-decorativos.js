'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('decorativos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      x: {
        type: Sequelize.INTEGER
      },
      y: {
        type: Sequelize.INTEGER
      },
      grupoDecorativoId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      nroPieza: {
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.INTEGER
      },
      baseId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      auxiliarId: {
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
    await queryInterface.dropTable('decorativos');
  }
};