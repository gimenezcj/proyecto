'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('familiares', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      familiar: {
        allowNull: false,
        type: Sequelize.ENUM('hijo','padre','tio','hermano','sobrino','ahijado','primo')
      },
      personaId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'personas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      },
      familiarId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'personas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade' 
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
    await queryInterface.dropTable('familiares');
  }
};