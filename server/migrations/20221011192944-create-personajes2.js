'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('personajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      puntajeAcumulado: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0
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
      imagenId:{
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'decorativos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      },
      pacienteId:{
        allowNull: true,
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
    await queryInterface.dropTable('personajes');
  }
};