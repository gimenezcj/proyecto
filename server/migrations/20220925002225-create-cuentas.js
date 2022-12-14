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
      usuario: {
        type: Sequelize.STRING
      },
      activo: {
        type: Sequelize.BOOLEAN
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
        allowNull: true,
        type: Sequelize.INTEGER    
      }, 
      imagenId:{
        allowNull: true,
        type: Sequelize.INTEGER    
      } 
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cuentas');
  }
};