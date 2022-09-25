'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('fonoaudiologos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matricula: {
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
      personaId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Personas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      } 

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('fonoaudiologos');
  }
};