'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('contactos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      celular: {
        type: Sequelize.STRING
      },
      fijo: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      tipofamiliarId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'TipoFamiliar',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('contactos');
  }
};