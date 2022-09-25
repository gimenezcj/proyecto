'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      dni: {
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
      contactoId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Contactos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      },
      cuentaId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Cuentas',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'      
      } 

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('personas');
  }
};