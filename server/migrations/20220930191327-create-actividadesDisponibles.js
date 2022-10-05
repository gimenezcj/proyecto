'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('actividadesDisponibles', {
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
      estimuloVisual: {
        allowNull: true,
        type: Sequelize.STRING
      },
      estimuloAuditivo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      puntosAOtorgar: {
        type: Sequelize.INTEGER,
        defaultValue: 0         
      },
      timpoMaximoResolucion: {
        type: Sequelize.INTEGER       //expresado en segundos
      },
      dificultad: {
        allowNull: false,
        type: Sequelize.ENUM('bajo','medio','alto'),
        defaultValue: 'bajo'
      },
      detalle: {
        type: Sequelize.STRING
      },
      recorridoId: {
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
    await queryInterface.dropTable('actividadesDisponibles');
  }
};