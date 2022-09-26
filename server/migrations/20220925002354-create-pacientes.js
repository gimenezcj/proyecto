'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nroAfiliado: {
        allowNull: true,
        type: Sequelize.STRING
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
      },
      personaId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'personas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      },
      fonoaudiologoId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'fonoaudiologos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pacientes');
  }
};