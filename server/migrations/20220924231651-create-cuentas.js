'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cuentas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clave: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      usuario: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      ingresoId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Ingresos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'     
      }, 
      imagenId:{
        type: Sequelize.INTEGER,
        references: {
          model: 'Imagenes',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'     
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cuentas');
  }
};