'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('evaluacionesPresenciales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecha: {
        type: Sequelize.DATE
      },
      observacion: {
        type: Sequelize.STRING
      },
      dificultad: {
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
      },
      pacienteId:{
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'pacientes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('evaluacionesPresenciales');
  }
};