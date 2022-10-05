'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('distractoresDisponibles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ejecuarEnBuble: {
        allowNull: true,
        type: Sequelize.BOOLEAN
      },
      nombre: {
        type: Sequelize.STRING
      },
      x: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      y: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      ruta: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tiempoEspera: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      tiempoInicial: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      tipo: {
        type: Sequelize.ENUM('sonido','niebla','lluvia','atardecer','noche','obstaculo')
      },
      imagenId: {
        allowNull: true,
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
    await queryInterface.dropTable('distractoresDisponibles');
  }
};